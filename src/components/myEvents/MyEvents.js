import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";
import { InviteResponse } from "../../contexts/InviteContext";
import EventCard from "./EventCard";
import AcceptedEventCard from "./AcceptedEventCard";
import Image from "../../assets/images/papers.svg";
import myEventsStyles from "./my-events.module.css";
import SmallTitle from "../atoms/small-title/SmallTitle";
import titleStyles from "../atoms/small-title/small-title.module.css";
import acceptEvent from "../../requests/events/acceptEvent/putAcceptEvent";
import declineEvent from "../../requests/events/declineEvent/putDeclineEvent";
import getMyEvents from "../../requests/events/getMyEvents/getMyEvents";
import getMyPendingEvents from "../../requests/events/getMyPendingEvents/getMyPendingEvents";
import LoadSpinner from "../load-spinner/LoadSpinner";
import "./my-events.module.css";
import Button from "../atoms/Button/index";
import buttonStyles from "../atoms/Button/styles.module.css";

const MyEvents = () => {
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [cardRemoved, setCardRemoved] = useState(0);
  const { user, token } = UserAuth();
  const {
    acceptedResponse,
    setAcceptedResponse,
    declinedResponse,
    setDeclinedResponse,
  } = InviteResponse();

  useEffect(() => {
    getMyEvents(setEvents, user.uid, token);
    if (events.length > 0) {
      setEvents(true);
    }
  }, [user, cardRemoved]);

  useEffect(() => {
    getMyPendingEvents(setPendingEvents, user.uid, token);
    if (pendingEvents.length > 0) {
      setPendingEvents(true);
    }
  }, [user, cardRemoved]);

  useEffect(() => {
    const acceptEventResponse = async () => {
      await acceptEvent(acceptedResponse, token);
      setCardRemoved((previous) => previous + 1);
    };
    acceptEventResponse();
  }, [acceptedResponse]);

  useEffect(() => {
    const declineEventResponse = async () => {
      await declineEvent(declinedResponse, token);
      setCardRemoved((previous) => previous + 1);
    };
    declineEventResponse();
  }, [declinedResponse]);

  const handleCreateEvent = () => {
    history.push("/create-event");
  };

  return (
    <div className={myEventsStyles.background}>
      {!user || !token || !events || !pendingEvents ? (
        <LoadSpinner />
      ) : (
        <>
          <img className={myEventsStyles.img} src={Image} alt="papers" />
          <div>
            <SmallTitle className={titleStyles.myEvents} text="My Events" />
            {pendingEvents.length > 0 && (
              <div className={myEventsStyles.myPendingEvents}>
                <SmallTitle
                  className={titleStyles.myPendingEvents}
                  text="Pending invitations"
                />
                <div className={myEventsStyles.myEvents}>
                  {pendingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      eventData={event}
                      userId={user.uid}
                      setAcceptedResponse={setAcceptedResponse}
                      setDeclinedResponse={setDeclinedResponse}
                    />
                  ))}
                </div>
              </div>
            )}
            {events.length > 0 && (
              <div className={myEventsStyles.myEvents}>
                {events.map((event) => (
                  <AcceptedEventCard
                    key={event.id}
                    eventData={event}
                    userId={user.uid}
                    setDeclinedResponse={setDeclinedResponse}
                  />
                ))}
              </div>
            )}
            {pendingEvents.length === [null] && events.length === [null] && (
              <SmallTitle
                className={titleStyles.myEventsNoEvents}
                text="You don't have any events yet..."
              />
            )}
            <div className={myEventsStyles.buttons}>
              <Button
                className={buttonStyles.myEvents}
                label="CREATE EVENT"
                onClick={handleCreateEvent}
              ></Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyEvents;
