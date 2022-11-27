import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import FormInput from "../atoms/form-input/FormInput";
import MultiSelectInput from "../atoms/form-input/MultiSelectInput";
import postEvent from "../../requests/events/postEvent";
import Alert from "../../requests/alert/Alert";
import Button from "../atoms/button/Button";
import formStyles from "./create-event-form.module.css";
import inputStyles from "../atoms/form-input/form-input.module.css";
import buttonStyles from "../atoms/button/button.module.css";
// import Downshift from "downshift";
// import classNames from "classnames";
// import DownShiftMultiSelect from "../atoms/form-input/DownShiftMultiSelect";

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

  const handleMultiInviteChange = (event) => {
    const selectedFriends = event.map((friend) => friend.value);
    setFields({ ...fields, ["friends_invited"]: selectedFriends });
  };

  return (
    <>
      <form role="form" onSubmit={handleCreateEvent}>
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
            />

            <FormInput
              className={inputStyles.input}
              label="Description"
              type="text"
              name="description"
              value={fields.description}
              onChange={handleFieldChange}
            />

            <FormInput
              className={inputStyles.input}
              label="Start"
              type="datetime-local"
              name="date_start"
              value={fields.date_start}
              onChange={handleFieldChange}
            />

            <FormInput
              className={inputStyles.input}
              label="End"
              type="datetime-local"
              name="date_end"
              value={fields.date_end}
              onChange={handleFieldChange}
            />

            <FormInput
              className={inputStyles.input}
              label="Location"
              type="text"
              name="location"
              value={fields.location}
              onChange={handleFieldChange}
            />

            {/*<DownShiftMultiSelect />*/}

            <MultiSelectInput
              styles={inputStyles.input}
              label="invite"
              onChange={handleMultiInviteChange}
              options={friends}
              name="invite"
              inputId="invite"
              placeholder="Select..."
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

export default CreateEventForm;

CreateEventForm.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};
