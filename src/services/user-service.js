import http from "./httpService";

const apiEndpoint = "/users";

export async function register(user) {
  const response = http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });

  return response;
}
