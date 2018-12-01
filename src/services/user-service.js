import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/users";

export async function register(user) {
  const response = http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });

  return response;
}
