import { FC, useId, useState } from "react";
import "./main.css";
import { Warichu } from "./Warichu";

type TextBlock = {
  isWarichu: boolean;
  content: string;
};

const initBlocks: TextBlock[] = [
  {
    isWarichu: false,
    content:
      "漢字は現代世界に多数ある文字の中で，唯一の象形文字である。もちろん，形で示された意味だけでなく，組み合わせによって多様な意味を持つようになっている",
  },
  {
    isWarichu: true,
    content: "会意や形声",
  },
  {
    isWarichu: false,
    content:
      "。象形文字らしさを残している漢字をいくつか紹介しておくと，「育」は上半部が「子」の倒置であり，さかさまに生まれてくる様子",
  },
  {
    isWarichu: true,
    content: "月は肉づきであり肉体関連を示す",
  },
  {
    isWarichu: false,
    content: "を表している。「疒」はベッド",
  },
  {
    isWarichu: true,
    content: "臨牀の牀の左側はベッドが立てられたようになっている",
  },
  {
    isWarichu: false,
    content: "の上に横臥する人",
  },
  {
    isWarichu: true,
    content: "なべぶたに似た上部",
  },
  {
    isWarichu: false,
    content:
      "を表し ている。「呆」は赤ん坊をおむつでくるむ様子であり，口を開け，手足を動かしているように見える。その他に，元の象形を知ると権力性を覚え，怖い気持ちになる漢字がいくつもある。「神」は「示」がいけにえをのせて直垂をたらした台を表し，「申」はイナヅマの象形から作られており",
  },
  {
    isWarichu: true,
    content: "「電」の下半部と同じ",
  },
  {
    isWarichu: false,
    content:
      "，併せて畏怖する光景を表しており，薬師如来などの仏や西洋の慈愛に満ちた神と異なっている。「民」は「眼」の右半分と似ており，眼をくりぬかれた被征服民を表し，「取」は敵の耳を「又」",
  },
  {
    isWarichu: true,
    content: "鎌の象形",
  },
  {
    isWarichu: false,
    content: "で切り取る様であり，「道」は被征服民の首を敷き詰めて造った通路",
  },
  {
    isWarichu: true,
    content: "シンニュウ",
  },
  {
    isWarichu: false,
    content: "を表している。",
  },
];

function App() {
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>(initBlocks);

  return (
    <div className="app">
      <div className="input-area">
        {textBlocks.map((tb) => (
          <BlockDisplay
            key={tb.content}
            textBlock={tb}
            deleteTextBlock={() =>
              setTextBlocks((prev) => prev.filter((item) => item !== tb))
            }
          />
        ))}
        <BlockInput
          addTextBlock={(tb) => setTextBlocks((prev) => [...prev, tb])}
        />
      </div>
      <div className="text-area">
        {textBlocks.map((tb) =>
          tb.isWarichu ? (
            <Warichu key={tb.content} content={tb.content} />
          ) : (
            <span key={tb.content}>{tb.content}</span>
          )
        )}
      </div>
    </div>
  );
}

const BlockDisplay: FC<{
  textBlock: TextBlock;
  deleteTextBlock: () => void;
}> = ({ textBlock, deleteTextBlock }) => {
  return (
    <div className="block-display">
      <label>割注</label>
      <input type="checkbox" checked={textBlock.isWarichu} disabled />
      <input type="text" value={textBlock.content} disabled />
      <button onClick={deleteTextBlock}>削除</button>
    </div>
  );
};

const BlockInput: FC<{ addTextBlock: (tb: TextBlock) => void }> = ({
  addTextBlock,
}) => {
  const [content, setContent] = useState("");
  const [isWarichu, setIsWarichu] = useState(false);
  const checkboxId = useId();

  return (
    <div className="block-input">
      <label htmlFor={checkboxId}>割注</label>
      <input
        id={checkboxId}
        type="checkbox"
        checked={isWarichu}
        onChange={(e) => setIsWarichu(e.target.checked)}
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={() => {
          if (!content) return;
          addTextBlock({ isWarichu, content });
          setContent("");
          setIsWarichu((prev) => !prev);
        }}
      >
        追加
      </button>
    </div>
  );
};

export default App;
