import axios from "axios";

// Current erroring with bad request. Need to match req data with main
const BASE_URL =
  process.env.REACT_APP_FIREBASE_FIRESTORE_URL ||
  "https://europe-west2-mc-play-date-scheduler.cloudfunctions.net/app";

const getUserFriends = async (userId, userIdToken) => {
  if (userId && userIdToken) {
    return axios
      .get(`${BASE_URL}/users/${userId}/friends`, {
        headers: { Authorization: `Bearer ${userIdToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default getUserFriends;
