import React from "react";
import { useHistory } from "react-router-dom";
import screenSize from "../../functions/screenSize";
import Subheading from "../atoms/subheading/Subheading";
import Title from "../atoms/title/Title";
import Image from "../../assets/images/swinging.svg";
import Button from "../atoms/Button/index";
import splash from "./splash.module.css";
import button from "../atoms/Button/styles.module.css";
import titleStyles from "../atoms/title/title.module.css";

const Splash = () => {
  const isSmall = screenSize();
  const history = useHistory();

  const handleSignUp = () => {
    history.push("/sign-up");
  };

  const handleSignIn = () => {
    history.push("/sign-in");
  };

  return (
    <>
      <div className={isSmall ? splash.smallScreen : splash.bigScreen}>
        <div className={splash.background}>
          <Title
            className={
              isSmall ? titleStyles.splash__title : titleStyles.splash__bigTitle
            }
            text="Playdate"
          />
          <Subheading />
          <img
            className={isSmall ? splash.img : splash.bigScreenImg}
            src={Image}
            alt="girl on a swing"
          />
          <div
            className={
              isSmall ? splash.buttonWrapper : splash.bigScreenButtonWrapper
            }
          >
            <Button
              className={button.signIn}
              label="Sign In"
              onClick={handleSignIn}
            ></Button>
            <Button
              className={button.signUp}
              label="Sign Up"
              onClick={handleSignUp}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Splash;
