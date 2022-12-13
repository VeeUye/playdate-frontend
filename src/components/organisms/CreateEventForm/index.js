import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import FormInput from "../../atoms/form-input/FormInput";
import postEvent from "../../../requests/events/postEvent";
import Alert from "../../../requests/alert/Alert";
import Button from "../../atoms/button/Button";
import formStyles from "./styles.module.css";
import inputStyles from "../../atoms/form-input/form-input.module.css";
import buttonStyles from "../../atoms/button/button.module.css";
import MultiSelect from "../../atoms/MultiSelect";

const CreateEventForm = ({ user, token, friends }) => {
  const history = useHistory();

  const initialState = {
    fields: {
      name: "",
      description: "",
      date_start: "",
      date_end: "",
      location: "",
      friends_invited: [],
      owner: "",
    },
    dates: {
      date_start: "",
      date_end: "",
    },
    alert: {
      message: "",
      isSuccess: false,
    },
  };

  const [fields, setFields] = useState(initialState.fields);

  const [dates, setDates] = useState(initialState.dates);

  const [alert, setAlert] = useState(initialState.alert);

  const handleCreateEvent = (event) => {
    event.preventDefault();
    dates.date_start = new Date(fields.date_start);
    dates.date_end = new Date(fields.date_end);
    setAlert({ message: "", isSuccess: false });
    postEvent(fields, token, setAlert);
    setFields(initialState.fields);
    setDates(initialState.dates);
    history.push("/my-profile");
  };

  const handleOnFieldChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
      ["owner"]: user.uid,
      ["friends_accepted"]: [user.uid],
    });
  };

  const handleOnFriendsInvitedChange = (event) => {
    const friendsInvited = fields.friends_invited;

    const addToFriendsInvited = () => {
      friendsInvited.push(event.target.value);
      console.log(friendsInvited, "----friend added");
      setFields({
        ...fields,
        ["friends_invited"]: friendsInvited,
      });
    };

    const removeFromFriendsInvited = () => {
      const friendsUninvited = friendsInvited.filter(
        (friend) => friend !== event.target.value
      );
      console.log(friendsUninvited, "----friend removed");
      setFields({
        ...fields,
        ["friends_invited"]: friendsUninvited,
      });
    };

    const friendShouldBeInvited = !friendsInvited.includes(event.target.value);

    friendShouldBeInvited ? addToFriendsInvited() : removeFromFriendsInvited();
  };

  return (
    <>
      <form role="form" onSubmit={handleCreateEvent} key="create-event-key">
        <div className={formStyles.field1}>
          <div>
            <FormInput
              className={inputStyles.input}
              label="Event Name"
              type="text"
              name="name"
              placeholder="Event name"
              value={fields.name}
              onChange={handleOnFieldChange}
              key="event-name-key"
            />

            <FormInput
              className={inputStyles.input}
              label="Description"
              type="text"
              name="description"
              value={fields.description}
              onChange={handleOnFieldChange}
              key="description-key"
            />

            <FormInput
              className={inputStyles.input}
              label="Start"
              type="datetime-local"
              name="date_start"
              value={fields.date_start}
              onChange={handleOnFieldChange}
              key="date-start-key"
            />

            <FormInput
              className={inputStyles.input}
              label="End"
              type="datetime-local"
              name="date_end"
              value={fields.date_end}
              onChange={handleOnFieldChange}
              key="date-end-key"
            />

            <FormInput
              className={inputStyles.input}
              label="Location"
              type="text"
              name="location"
              value={fields.location}
              onChange={handleOnFieldChange}
              key="location-key"
            />

            <MultiSelect
              friends={friends}
              onChange={handleOnFriendsInvitedChange}
              label="invite"
              name="invite"
              value={fields.friends_invited}
            />

            <Alert message={alert.message} success={alert.isSuccess} />

            <Button
              className={buttonStyles.createEvent}
              type="submit"
              label="Create Event"
            />
          </div>
        </div>
      </form>
    </>
  );
};

CreateEventForm.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

export default CreateEventForm;
