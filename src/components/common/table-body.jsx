import React, { Component } from "react";
import Like from "../common/like";
import { Link } from "react-router-dom";
import auth from "../../services/auth-service";
class TableBody extends Component {
  render() {
    const user = auth.getCurrentUser();
    let isAdmin = false;
    if (user) {
      isAdmin = user.isAdmin ? user.isAdmin : false;
    }
    const { movies, handleDelete, handleLike } = this.props;
    return (
      <tbody>
        {movies.map(movie => {
          return (
            <tr key={movie._id}>
              <td>
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like onLike={() => handleLike(movie)} liked={movie.liked} />
              </td>
              {isAdmin && (
                <td>
                  <button
                    className="btn btn-danger bt-sm"
                    onClick={() => {
                      handleDelete(movie);
                    }}
                  >
                    delete
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
