import http from "./httpService";

const apiEndpoint = "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  try {
    return http.get(apiEndpoint + "/" + id);
  } catch (ex) {
    console.error(ex);
  }
}

export function saveMovie(movie, fun) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    http.put(apiEndpoint + "/" + movie._id, body).then(sucess => {
      fun();
    });
  } else {
    http.post(apiEndpoint, movie).then(sucess => {
      fun();
    });
  }
  return;
}

export async function deleteMovie(id) {
  return http.delete(apiEndpoint + "/" + id);
}
