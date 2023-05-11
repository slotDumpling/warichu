import {
  CSSProperties,
  FC,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const Warichu: FC<{ content: string }> = ({ content }) => {
  const halfContent = useMemo(() => {
    const midIndex = Math.ceil(content.length / 2);
    const str1 = content.slice(0, midIndex);
    const str2 = content.slice(midIndex);
    const div = document.createElement("div");
    div.classList.add("test-line-wrapper");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    p1.innerText = str1;
    p2.innerText = str2;
    div.append(p1, p2);
    document.body.appendChild(div);
    const { width: w1 } = p1.getBoundingClientRect();
    const { width: w2 } = p2.getBoundingClientRect();
    div.remove();
    return w1 > w2 ? str1 : str2;
  }, [content]);
  const phStartEl = useRef<HTMLElement>(null);
  const phEndEl = useRef<HTMLElement>(null);
  const wrapperEl = useRef<HTMLElement>(null);

  const [beginTop, setBeginTop] = useState(0);
  const [endBottom, setEndBottom] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [fontSize, setFontSize] = useState(0);
  const lineMargin = lineHeight / 2 - (2 * fontSize) / 3;
  const [rows, setRows] = useState(0);

  const polygon = useMemo(() => {
    let offset = 0;
    const tempPath = [];
    for (let i = 0; i < rows - 1; i++) {
      tempPath.push(
        `${offset}px 0`,
        `${offset}px 100%`,
        `${offset + lineMargin * 2}px 100%`,
        `${offset + lineMargin * 2}px 0`
      );
      offset += lineHeight;
    }
    if (rows > 1) offset -= lineHeight;
    tempPath.push(
      `${offset}px 0`,
      `${offset}px ${beginTop}px`,
      `100% ${beginTop}px`,
      `100% 0`
    );
    return "polygon(" + tempPath.join(", ") + ")";
  }, [lineHeight, lineMargin, rows, beginTop]);

  useLayoutEffect(() => {
    const resetStyle = () => {
      if (!phStartEl.current || !phEndEl.current || !wrapperEl.current) return;
      const { top: phStartTop, left: phStartLeft } =
        phStartEl.current.getBoundingClientRect();
      const { top: wrapperTop, bottom: wrapperBottom } =
        wrapperEl.current.getBoundingClientRect();
      const { bottom: phEndBottom, left: phEndLeft } =
        phEndEl.current.getBoundingClientRect();
      setBeginTop(phStartTop - wrapperTop);
      setEndBottom(wrapperBottom - phEndBottom);

      const computedStyle = window.getComputedStyle(phStartEl.current);

      const lineHeight = parseFloat(computedStyle.lineHeight);
      const fontSize = parseFloat(computedStyle.fontSize);
      const rows = Math.round((phStartLeft - phEndLeft) / lineHeight + 1);
      setRows(rows);
      setFontSize(fontSize);
      setLineHeight(lineHeight);
    };

    window.addEventListener("resize", resetStyle);
    resetStyle();
    document.fonts.ready.then(resetStyle);
    return () => window.removeEventListener("resize", resetStyle);
  }, []);

  return (
    <span className="warichu">
      <span
        className="warichu-wrapper"
        ref={wrapperEl}
        style={
          {
            "--polygon": polygon,
            "--big-line-height": lineHeight + "px",
            "--end-bottom": endBottom + "px",
            "--before-height": rows === 1 ? beginTop + "px" : "100%",
            width: rows * lineHeight + "px",
            textAlign: rows === 1 ? "start" : "justify",
          } as CSSProperties
        }
      >
        <span className="warichu-text">{content}</span>
      </span>
      <i ref={phStartEl} className="warichu-ph-start"></i>
      <span className="warichu-placeholder">{halfContent}</span>
      <i ref={phEndEl} className="warichu-ph-end"></i>
    </span>
  );
};
