import axios from "axios";

export const BASE_URL =
  process.env.REACT_APP_FIREBASE_FIRESTORE_URL ||
  "https://europe-west2-mc-play-date-scheduler.cloudfunctions.net/app";

export const postEvent = async (fields, userIdToken, setAlert) => {
  try {
    const response = await axios.post(`${BASE_URL}/events`, fields, {
      headers: { Authorization: `Bearer ${userIdToken}` },
    });

    setAlert({
      message: "Event Created",
      isSuccess: true,
    });

    console.log(response.data, "response");

    return response.data;
  } catch (err) {
    setAlert({
      message: "Server Error. Please try again later",
      isSuccess: false,
    });

    console.log(err, "error");
    return err;
  }
};
