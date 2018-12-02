import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiEndpoint = "/login";
const tokenKey = "token";

async function login(email, password) {
  const { headers } = await http.post(apiEndpoint, { email, password });
  //console.log(headers);
  localStorage.setItem(tokenKey, headers["x-auth-token"]);
}
function logout() {
  localStorage.removeItem(tokenKey);
}
function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}
function loginWithJwt(jwt) {
  console.log(jwt);
  localStorage.setItem(tokenKey, jwt);
}

function getAuthToken() {
  return localStorage.getItem(tokenKey);
}

http.setJwt(getAuthToken());
export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getAuthToken
};
