import { ChangeEvent, useEffect, useState } from "react";
import "./Input.css";

const MIN_WIDTH = 120;
const PLACEHOLDER = "Add tab";

const calcWidth = (text: string) => {
  const int = 7.7;
  return (text.length + 1) * int;
};

interface Props {
  value: string;
  onBlur: (value: string) => void;
}
export const InputForAdd = ({ value, onBlur }: Props) => {
  const [text, setText] = useState<string>(value);
  const [width, setWidth] = useState<number>(120);

  const handleResize = (value: string) => {
    const w = calcWidth(value);
    setWidth(w);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    handleResize(value);
    setText(value);
  };

  useEffect(() => {
    handleResize(value);
    setText(value);
  }, [value]);

  const handleBlur = () => {
    if (!text) {
      return;
    }

    onBlur(text);
    setText("");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
      e.currentTarget.blur();
    }
  };

  return (
    <input
      className="input input_add"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleEnter}
      placeholder={PLACEHOLDER}
      style={{ width: `${width < MIN_WIDTH ? MIN_WIDTH : width}px` }}
    />
  );
};
