import "./TabIcon.css";

interface Props {
  src?: string;
}

export const TabIcon = ({ src }: Props) => {
  return (
    <img
      className="tabIcon"
      src={src || "/images/grayAppIcon.svg"}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = "/images/grayAppIcon.svg";
      }}
    />
  );
};
