interface Props {
  w?: number;
}

export const Mr = ({ w = 1 }: Props) => {
  return <div style={{ width: `${8 * w}px` }} />;
};
