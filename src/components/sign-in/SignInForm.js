import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";
import Input from "../atoms/Input";
import screenSize from "../../functions/screenSize";
import Button from "../atoms/Button/index";
import Divider from "../../assets/images/or-divider.svg";
import formStyles from "./sign-in-form.module.css";
import inputStyles from "../atoms/Input/styles.module.css";
import buttonStyles from "../atoms/Button/styles.module.css";

const SigninForm = () => {
  const initialState = {
    fields: {
      email: "",
      password: "",
    },
  };

  const { signIn } = UserAuth();

  const [fields, setFields] = useState(initialState.fields);

  const history = useHistory();

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    console.log(fields);
    setFields(initialState.fields);
    try {
      await signIn(fields.email, fields.password);
      history.push("/my-profile");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    history.push("/sign-up");
  };

  const isSmall = screenSize();

  return (
    <>
      <form onSubmit={handleCreateEvent}>
        <div className={formStyles.signUpField1}>
          <div>
            <Input
              className={inputStyles.inputSignUp}
              label="email"
              type="email"
              name="email"
              value={fields.email}
              onChange={handleFieldChange}
            />

            <Input
              className={inputStyles.inputSignUp}
              label="Password"
              type="password"
              name="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
            <div
              className={
                isSmall
                  ? formStyles.buttonWrapper
                  : formStyles.bigScreenButtonWrapper
              }
            >
              <p className={formStyles.password}>FORGOT PASSWORD?</p>
              <Button
                className={buttonStyles.signUp2}
                type="submit"
                label="Sign In"
              />
              <img className={formStyles.divider} src={Divider} alt="divider" />
              <Button
                className={buttonStyles.signIn2}
                type="submit"
                label="Sign Up"
                onClick={handleSignUp}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SigninForm;
