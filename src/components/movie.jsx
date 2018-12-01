import React, { Component } from "react";
import ListGroup from "./common/list-group";
import { getGenres } from "../services/genre-service";
import { getMovies, deleteMovie } from "../services/movie-service";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import MovieTable from "./movie-table";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default class Movies extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    movies: [],
    genres: [],
    currentGenre: "all",
    sortColumn: { path: "title", ord: "asc" },
    searchQuery: ""
  };
  async componentDidMount() {
    const genres = await getGenres();
    const movies = await getMovies();
    this.setState({ movies: movies.data, genres: genres.data });
  }
  constructor() {
    super();
    this.handleLike = this.handleLike.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSort = this.handleSort.bind(this);
    //this.deleteMov = this.deleteMov.bind(this);
    /*we need not to bind this beacuse renderMovies
     is the parent of deleteMov so this is bound automatically to */
  }
  handleSort(sortColumn) {
    this.setState({ sortColumn: sortColumn });
  }
  async handleDelete(movie) {
    const originalMovie = this.state.movies;
    const movies = originalMovie.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 403) {
        this.setState({ movies: originalMovie });
      }
      if (ex.response && ex.response.status === 404) {
        toast.error("movie has already deleted");
        this.setState({ movies: originalMovie });
      }
    }
  }
  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }
  handleGenre(genre) {
    //if (genre === "All") return null;
    this.setState({ currentGenre: genre, searchQuery: "", currentPage: 1 });
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }
  search = e => {
    const query = e.currentTarget.value;
    this.setState({ currentGenre: "all", searchQuery: query, currentPage: 1 });
  };
  render() {
    const { user } = this.props;
    let filteredMovies;
    if (!this.state.searchQuery) {
      filteredMovies = this.state.currentGenre._id
        ? this.state.movies.filter(movie => {
            return movie.genre._id === this.state.currentGenre._id;
          })
        : this.state.movies;
    } else {
      filteredMovies = this.state.movies.filter(movie => {
        return movie.title.toLowerCase().startsWith(this.state.searchQuery);
      });
    }

    const orderedMovies = _.orderBy(
      filteredMovies,
      this.state.sortColumn.path,
      this.state.sortColumn.ord
    );
    const movies = paginate(
      orderedMovies,
      this.state.currentPage,
      this.state.pageSize
    );
    if (this.state.movies.length === 0) {
      return <div> loading ....</div>;
    }
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.handleGenre}
            onItemSelect={this.state.currentGenre}
          />
        </div>
        <div className="col">
          {user && (
            <div className="mb-2">
              <Link to="/movies/new" className="button btn btn-primary">
                New Movie
              </Link>
            </div>
          )}

          <div className="mb-2">
            {filteredMovies.length !== 0
              ? `Showing ${filteredMovies.length} movies from the database`
              : "No movies to show"}
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              placeholder="Search..."
              onChange={this.search}
              value={this.state.searchQuery}
            />
          </div>
          <MovieTable
            movies={movies}
            handleLike={this.handleLike}
            handleDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}
