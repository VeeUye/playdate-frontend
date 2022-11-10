import React, { useState, useEffect } from "react";
import { UserAuth } from "../../contexts/AuthContext";
import getUserFriends from "../../requests/users/getUserFriends";

import screenSize from "../../functions/screenSize";
import SmallTitle from "../atoms/small-title/SmallTitle";
import CreateEventForm from "./CreateEventForm";
import LoadSpinner from "../load-spinner/LoadSpinner";

import Image from "../../assets/images/float.svg";

import createEventStyles from "../create-event/create-event.module.css";
import titleStyles from "../atoms/small-title/small-title.module.css";
import "./create-event.module.css";

const CreateEvent = () => {
  const isSmall = screenSize();

  const { user, token } = UserAuth();

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getUserFriends(user.uid, token).then((result) => {
      if (result) {
        const friendsInvite = result.map((friend) => {
          return { value: friend.userId, label: friend.name };
        });
        setFriends(friendsInvite);
      }
    });
  }, [user]);

  return (
    <>
      {!user || !token || !friends ? (
        <LoadSpinner />
      ) : (
        <div
          className={
            isSmall
              ? createEventStyles.smallScreen
              : createEventStyles.bigScreen
          }
        >
          <div className="outer" data-testid="create-event-outer">
            <SmallTitle className={titleStyles.default} text="Create Event" />
            <CreateEventForm
              user={user}
              token={token}
              friends={friends}
              data-testid="create-event-form"
            />
            <img
              className={createEventStyles.img}
              src={Image}
              alt="girl floating"
            />
          </div>
          <img
            className={createEventStyles.img2}
            src={Image}
            alt="girl floating"
          />
        </div>
      )}
    </>
  );
};

export default CreateEvent;
