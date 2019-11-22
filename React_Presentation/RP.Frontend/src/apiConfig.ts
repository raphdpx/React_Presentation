import { Configuration } from "./api";

let url = process.env.REACT_APP_API_URL;

export const apiConfiguration = () => {
  const configuration = {
    basePath: url
  };
  return new Configuration(configuration);
};

export const setApiUrl = (u: string) => {
  console.log("Set Api url with " + u);
  url = u;
};
