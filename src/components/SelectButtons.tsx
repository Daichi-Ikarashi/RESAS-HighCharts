import React from "react";

type Props = {
  prefectures:
    | {
        prefCode: number;
        prefName: string;
      }[];

  onChange: (name: string, prefName: number, check: boolean) => void;
};

// 都道府県一覧のボタンを表示コンポーネント
const SelectButtons = ({ prefectures, onChange }: Props) => {
  return (
    <>
      <div className="selectButtonsField">
        {prefectures.map((prefecture) => (
          <div className="selectButtonContainer" key={prefecture.prefName}>
            <input
              className="checkbox"
              type="checkbox"
              name="Prefecture name"
              onChange={(event) =>
                onChange(
                  prefecture.prefName,
                  prefecture.prefCode,
                  event.target.checked
                )
              }
              id={"checkbox" + prefecture.prefCode}
            />
            <label className="text" htmlFor={"checkbox" + prefecture.prefCode}>
              {prefecture.prefName.length === 3
                ? " " + prefecture.prefName
                : prefecture.prefName}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectButtons;
