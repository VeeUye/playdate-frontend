import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import FormInput from "../atoms/form-input/FormInput";
// import MultiSelectInput from "../atoms/form-input/MultiSelectInput";
import postEvent from "../../requests/events/postEvent";
import Alert from "../../requests/alert/Alert";
import Button from "../atoms/button/Button";
import formStyles from "./create-event-form.module.css";
import inputStyles from "../atoms/form-input/form-input.module.css";
import buttonStyles from "../atoms/button/button.module.css";

// eslint-disable-next-line no-unused-vars
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

  const handleFieldChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
      ["owner"]: user.uid,
      ["friends_accepted"]: [user.uid],
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleMultiInviteChange = (event) => {
    console.log(event.target.value);
    const updateArr = fields.friends_invited;
    updateArr.push(event.target.value);
    console.log(updateArr);
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
      ["owner"]: user.uid,
      ["friends_invited"]: updateArr,
    });
  };

  // console.log(event);
  // const selectedFriends = event.map((friend) => friend.value);
  // setFields({
  //   ...fields,
  //   [event.target.name]: event.target.value,
  //   ["owner"]: user.uid,
  //   [fields.friends_invited]: selectedFriends,
  // });
  // };

  console.log(fields.friends_invited);

  // For some reason, frontend cant read the label, and backend won't accept the value

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
              onChange={handleFieldChange}
              key="event-name-key"
            />

            <FormInput
              className={inputStyles.input}
              label="Description"
              type="text"
              name="description"
              value={fields.description}
              onChange={handleFieldChange}
              key="description-key"
            />

            <FormInput
              className={inputStyles.input}
              label="Start"
              type="datetime-local"
              name="date_start"
              value={fields.date_start}
              onChange={handleFieldChange}
              key="date-start-key"
            />

            <FormInput
              className={inputStyles.input}
              label="End"
              type="datetime-local"
              name="date_end"
              value={fields.date_end}
              onChange={handleFieldChange}
              key="date-end-key"
            />

            <FormInput
              className={inputStyles.input}
              label="Location"
              type="text"
              name="location"
              value={fields.location}
              onChange={handleFieldChange}
              key="location-key"
            />

            {/*Include DownshiftMulti Select below */}

            {/*<DownshiftMultiSelect*/}
            {/*  friends={friends}*/}
            {/*  onChange={handleMultiInviteChange}*/}
            {/*  label="invite"*/}
            {/*  name="invite"*/}
            {/*  value={fields.friends_invited}*/}
            {/*/>*/}

            {/*<MultiComboBox*/}
            {/*  friends={friends}*/}
            {/*  handleMultiInviteChange={handleMultiInviteChange}*/}
            {/*  key="invite-friends-key"*/}
            {/*  value={fields.friends_invited}*/}
            {/*/>*/}

            {/*<MultiSelectInput*/}
            {/*  styles={inputStyles.input}*/}
            {/*  label="invite"*/}
            {/*  onChange={handleMultiInviteChange}*/}
            {/*  options={friends}*/}
            {/*  name="invite"*/}
            {/*  inputId="invite"*/}
            {/*  placeholder="Select..."*/}
            {/*/>*/}

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

export default CreateEventForm;

// sort proptypes

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
