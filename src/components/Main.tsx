import React, { useEffect, useState } from "react";
import SelectButtons from "./SelectButtons";
import Graph from "./Graph";

import axios from "axios";

const Main = () => {
    const [prefectures, setPreFectures] = useState<{
        message: null;
        result: {
            prefCode: number;
            prefName: string;
        }[];
    } | null>(null);
    
    const [prefPopulation, setPrefPopulation] = useState <{
        prefName: string; data: { year: number; value: number }[] }[]
    >([]);

    useEffect(() => {
        // 都道府県一覧を取得する
        axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
            headers: { "X-API-KEY" : String(process.env.REACT_APP_API_KEY) },
      })
      .then((results) => {
        setPreFectures(results.data);
      })
        .catch((error) => {});
    }, []);

    // チェックボックスをクリックしたときの処理
    const handleClickCheck = (
        prefName: string,
        prefCode: number,
        check: boolean
        ) => {
            let c_prefPopulation = prefPopulation.slice();

        // チェックをつけた処理
        if (check) {
            if (c_prefPopulation.findIndex((value) => value.prefName === prefName) !== -1)
                return;

            axios.get(
                "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode="
                + String(prefCode),
                {
                    headers: { "X-API-KEY": String(process.env.REACT_APP_API_KEY) },
                }
            )
            .then((results) => {
                c_prefPopulation.push({
                    prefName: prefName,
                    data: results.data.result.data[0].data,
                });

                setPrefPopulation(c_prefPopulation);
            })
            .catch((error) => {
                return;
            });
        }
        // チェックを外した処理
        else {
            const deleteIndex = c_prefPopulation.findIndex(
                (value) => value.prefName === prefName
            );
            if (deleteIndex === -1) return;
            c_prefPopulation.splice(deleteIndex, 1);
            setPrefPopulation(c_prefPopulation);
        }
    };

    return (
        <main>
            <h2 className="label">都道府県</h2>
                {prefectures && (
                    <SelectButtons
                        prefectures={prefectures.result}
                        onChange={handleClickCheck}
                    />
                )}
            <h2 className="label">人口推移グラフ</h2>
                <Graph populationdata={prefPopulation} />
        </main>
    );
};

export default Main;