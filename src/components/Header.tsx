import { Btn } from "./Btn";
import { Mr } from "./Mr";
import { Spacer } from "./Spacer";
import "./Header.css";
import { createGroup } from "../utils/chromeStore";

const DONATE_LINK = "https://www.patreon.com/ultimate_tab";

export const Header = () => {
  return (
    <div className="header">
      <img className="logo" src="/images/appIcon.svg" alt="logo" />
      <div className="header__title">Ultimate Tab</div>
      <Spacer />
      <Btn onClick={createGroup}>Create group</Btn>
      <Mr w={4} />
      <Btn href={DONATE_LINK}>Donate</Btn>
    </div>
  );
};
