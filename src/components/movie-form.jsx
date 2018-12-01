import React from "react";
import { getGenres } from "../services/genre-service";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "./../services/movie-service";

class MovieForm extends Form {
  state = {
    data: { title: "", dailyRentalRate: "", genreId: "", numberInStock: "" },
    genres: [],
    errors: {}
  };
  schema = {
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0),
    _id: Joi.string()
  };
  allGenres = async () => {
    const genreList = await getGenres();
    this.setState({ genres: genreList.data });
    return genreList.data;
  };
  doSubmit = e => {
    // call to server
    const { history } = this.props;
    console.log("submitted");
    saveMovie(this.state.data, () => {
      history.push("/movies");
    });
  };
  currentMovie = async id => {
    const { history } = this.props;
    let current;
    try {
      current = await getMovie(id);
    } catch (ex) {
      if (ex) {
        console.log(ex);
        history.replace("/not-found");
        return;
      }
    }
    return current.data;
  };
  async populateMovies() {
    const { match } = this.props;

    const id = match.params.id;
    if (id === "new") {
      return;
    }
    const movie = await this.currentMovie(id);
    if (!movie) return;
    const { _id, title, dailyRentalRate, genre, numberInStock } = movie;
    console.log(movie);
    const obj = {
      _id: _id,
      title: title,
      dailyRentalRate: dailyRentalRate,
      genreId: genre._id,
      numberInStock: numberInStock
    };
    this.setState({ data: obj });
  }
  async componentDidMount() {
    await this.allGenres();
    await this.populateMovies();
  }
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSumbit}>
          {this.renderInput("title", "Title")}
          {this.renderDropdown("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderLabel("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
