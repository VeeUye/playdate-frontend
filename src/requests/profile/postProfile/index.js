import axios from "axios";

export const BASE_URL =
  process.env.REACT_APP_FIREBASE_FIRESTORE_URL ||
  "https://europe-west2-mc-play-date-scheduler.cloudfunctions.net/app";

export const postProfile = async (fields, userIdToken, setAlert) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, fields, {
      headers: { Authorization: `Bearer ${userIdToken}` },
    });

    setAlert({
      message: "Profile Created",
      isSuccess: true,
    });

    console.log(response.data);

    return response.data;
  } catch (err) {
    setAlert({
      message: "Server Error. Please try again later",
      isSuccess: false,
    });
    console.log(err);
    return err;
  }
};
