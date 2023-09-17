import React, { ChangeEvent, useEffect, useState } from "react";
import "./Input.css";

const MIN_WIDTH = 120;
const MAX_TITLE_LENGTH = 40;
const PLACEHOLDER = "Nameless";

const calcWidth = (text: string) => {
  const int = 7.7;
  return (text.length + 1) * int;
};

interface Props {
  value: string;
  onBlur: (value: string) => void;
}

export const InputGroupName = ({ value, onBlur }: Props) => {
  const [text, setText] = useState<string>(value);
  const [width, setWidth] = useState<number>(120);

  const handleResize = (value: string) => {
    const w = calcWidth(value);
    setWidth(w);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length > MAX_TITLE_LENGTH) {
      return;
    }

    handleResize(value);
    setText(value);
  };

  useEffect(() => {
    handleResize(value);
    setText(value);
  }, [value]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onBlur(text);
      e.currentTarget.blur();
    }
  };

  return (
    <input
      className="input"
      value={text}
      onChange={handleChange}
      onBlur={() => onBlur(text)}
      onKeyDown={handleEnter}
      placeholder={PLACEHOLDER}
      style={{ width: `${width < MIN_WIDTH ? MIN_WIDTH : width}px` }}
    />
  );
};
