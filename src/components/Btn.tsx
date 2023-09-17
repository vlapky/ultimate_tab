import { ReactNode } from "react";
import "./Btn.css";

interface Props {
  onClick?: () => void;
  children?: ReactNode;
  href?: string;
}
export const Btn = ({ onClick, children, href }: Props) => {
  if (href) {
    return (
      <a href={href} className={"btn btn_link"} target="_blank">
        {children}
      </a>
    );
  }

  return (
    <div className={"btn"} onClick={onClick}>
      {children}
    </div>
  );
};
