import React, { useState, useEffect } from "react";
import { UserAuth } from "../../../contexts/AuthContext";
import getUserFriends from "../../../requests/users/getUserFriends";

import screenSize from "../../../functions/screenSize";
import SmallTitle from "../../atoms/small-title/SmallTitle";
import CreateEventForm from "../../organisms/CreateEventForm";
import LoadSpinner from "../../load-spinner/LoadSpinner";

import Image from "../../../assets/images/float.svg";

import styles from "./create-event.module.css";
import titleStyles from "../../atoms/small-title/small-title.module.css";
import classNames from "classnames";

const CreateEvent = () => {
  const isSmall = screenSize();
  const { user, token } = UserAuth();

  const [friends, setFriends] = useState([{}]);

  useEffect(() => {
    getUserFriends(user.uid, token).then((result) => {
      if (result) {
        const currentFriends = result.map((friend) => {
          return { value: friend.userId, label: friend.name };
        });
        console.log(currentFriends);
        setFriends(currentFriends);
      }
    });
  }, [user]);

  return (
    <>
      {!user || !token || !friends ? (
        <LoadSpinner />
      ) : (
        <div
          className={classNames(
            { [styles.smallScreen]: isSmall },
            { [styles.bigScreen]: !isSmall }
          )}
          data-testid="create-event-outer"
        >
          <div>
            <SmallTitle
              className={classNames(titleStyles.default, styles.title)}
              text="Create Event"
            />

            <CreateEventForm
              user={user}
              token={token}
              friends={friends}
              data-testid="create-event-form"
              key="create-event-outer"
            />
          </div>
          <img className={styles.img} src={Image} alt="girl floating" />
          <img className={styles.img2} src={Image} alt="girl floating" />
        </div>
      )}
    </>
  );
};

export default CreateEvent;
