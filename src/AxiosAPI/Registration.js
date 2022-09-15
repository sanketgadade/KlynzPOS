import axios from "axios";
import { stageAPIURL } from "./APIConfig";

export const postPosData = async (posData) => {
  console.log(posData);
  var res = {
    status: 200,
  };
  //TODO ::change below API URL to BE URL
  var res1 = axios
    .post("https://jsonplaceholder.typicode.com/posts", posData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  // return res1;
  return res;
};
