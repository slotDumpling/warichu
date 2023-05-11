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
      "『漢字御廃止之議』は、将軍に上申後久しく世に知られなかったが、明治32年に前島と同郷後進のかな文字論者小西信八が、国字改良論の最先覚としての前島の功を顕彰しようとして、『漢字御廃止之議』の草案をはじめ、『国文教育之儀ニ付建議』『国文教育施行ノ方法』",
  },
  {
    isWarichu: true,
    content: "共に明治2年集議院に提出",
  },
  {
    isWarichu: false,
    content: "『学制御施行ニ先タチ国字改良相成度卑見内申書』",
  },
  {
    isWarichu: true,
    content: "明治六年右大臣岩倉具視に上申",
  },
  {
    isWarichu: false,
    content: "『興国文廃漢字議』",
  },
  {
    isWarichu: true,
    content: "同六年政府にも建議せんとして起草、都合により不提出",
  },
  {
    isWarichu: false,
    content:
      "の後の建白文をも合編、それに『前島密君国字国文改良建議書』の表題を付けて印刷し非売配布した小冊子によって、初めて一部の人々に知られ、更に33年4月国字改良の世論に応えて文部省が8名の国語調査委員を創設した際、その委員長を委嘱された前島が、「太陽」記者のもとめで同誌5月号に寄せられた『国語調査の意見』中に掲出した、同建白書の枢要な部分の公表によって、更に一般の知るところとなった",
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
