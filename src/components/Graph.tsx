import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  populationdata: {
    prefName: string;
    data: { year: number; value: number }[];
  }[];
};

// 選択した都道府県の人口推移グラフを表示するコンポーネント
const Graph = ({ populationdata }: Props) => {
  let series: Highcharts.SeriesOptionsType[] = [];
  let categories = [];

  for (let p of populationdata) {
    let data = [];

    for (let pd of p.data) {
      data.push(pd.value);
      categories.push(String(pd.year));
    }

    series.push({
      type: "line",
      name: p.prefName,
      data: data,
    });
  }
  // Highchatsの設定
  const options: Highcharts.Options = {
    title: {
      text: "人口推移グラフ",
    },
    // x軸
    xAxis: {
      title: {
        text: "年度",
      },
      categories: categories,
    },
    // y軸
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    // 都道府県を１つも選んでいない場合との分岐条件
    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };
  return (
    <div className="graph">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph;
