import React, { useEffect, useState } from "react";
import SelectButtons from "./SelectButtons";
import Graph from "./Graph";

// HTTP通信用 jsライブラリ
// 仕様:https://axios-http.com/docs/intro
import axios from "axios";

// RESAS API を叩いて、ボタン生成 + 押されたボタンの人口取得してGraphに投げて呼び出す
const Main = () => {
  // useState で都道府県のName(str),Code(num)の値を管理
  const [prefectures, setPreFectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>(null);

  // useState で都道府県のName(str),data:年と人口の値を管理
  const [prefPopulation, setPrefPopulation] = useState<
    {
      prefName: string;
      data: { year: number; value: number }[];
    }[]
  >([]);

  useEffect(() => {
    // axiosライブラリのgetメソッドでRESAS APIを叩き、都道府県一覧を取得する
    // APIキーは環境変数に格納 .env
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": String(process.env.REACT_APP_API_KEY) },
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
    // 元の配列の値をコピー
    let c_prefPopulation = prefPopulation.slice();

    // チェックをつけた処理
    if (check) {
      // チェック済み（prefNameが重複）でないか確認
      if (
        c_prefPopulation.findIndex((value) => value.prefName === prefName) !==
        -1
      )
        return;

      axios
        .get(
          "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
            String(prefCode),
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
      // チェックを外すprefNameのIndexを取ってきて削除する
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
      <p className="label">都道府県</p>
      {prefectures && (
        <SelectButtons
          prefectures={prefectures.result}
          onChange={handleClickCheck}
        />
      )}
      <Graph populationdata={prefPopulation} />
    </main>
  );
};

export default Main;
