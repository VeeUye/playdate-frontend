import React, { useState } from "react";
import { UserAuth } from "../../../contexts/AuthContext";

import screenSize from "../../../functions/screenSize";
import ProfilePicture from "../../profile-picture/ProfilePicture";
import CreateProfileForm from "../../organisms/CreateProfileForm";
import SmallTitle from "../../atoms/small-title/SmallTitle";

import LoadSpinner from "../../load-spinner/LoadSpinner";

import styles from "./styles.module.css";
import titleStyles from "../../atoms/small-title/small-title.module.css";

import Image from "../../../assets/images/skater.svg";

const CreateProfile = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const { user, token } = UserAuth();
  const isSmall = screenSize();
  return (
    <div className={isSmall ? styles.smallScreen : styles.bigScreen}>
      {!user || !token ? (
        <LoadSpinner />
      ) : (
        <>
          <div className="background" data-testid="create-profile">
            <SmallTitle
              className={titleStyles.createProfile}
              text="Create Profile"
            />
            <div className={styles.picUpload}>
              <ProfilePicture imgUrl={imgUrl} setImgUrl={setImgUrl} />
            </div>
            <CreateProfileForm imgUrl={imgUrl} user={user} token={token} />
            <img className={styles.img} src={Image} alt="skater boy" />
          </div>
          <img className={styles.img2} src={Image} alt="skater boy" />
        </>
      )}
    </div>
  );
};

export default CreateProfile;
