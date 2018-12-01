import React, { Component } from "react";

import TableHeader from "./common/table-header";
import TableBody from "./common/table-body";
class MovieTable extends Component {
  columns = [
    { path: "title", title: "Title" },
    { path: "genre.name", title: "Genre" },
    { path: "numberInStock", title: "Stock" },
    { path: "dailyRentalRate", title: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];

  render() {
    const { movies, handleLike, handleDelete, sortColumn, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          movies={movies}
          handleDelete={handleDelete}
          handleLike={handleLike}
        />
      </table>
    );
  }
}
export default MovieTable;
