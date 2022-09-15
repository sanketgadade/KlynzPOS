import axios from "axios";
import { stageAPIURL } from "./APIConfig";

export const postRegistrationData = async (posData) => {
  console.log(posData);
  var res = {
    status: 200,
  };
  // const res = axios.post(stageAPIURL + `customerposdata`, {
  //   posData,
  // });
  // return res;
  return res;
};
