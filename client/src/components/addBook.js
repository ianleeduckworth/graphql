import React, { useState } from "react";
import flowright from "lodash.flowright";
import { graphql } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
  getGenresQuery
} from "../queries/queries";

const AddBook = props => {
  const { getAuthorsQuery, getGenresQuery, addBookMutation } = props;

  const { authors } = getAuthorsQuery;
  const { genres } = getGenresQuery;

  const loading = getAuthorsQuery.loading || getGenresQuery.loading;

  const [name, setName] = useState("");
  const [genreId, setGenreId] = useState("");
  const [authorId, setAuthorId] = useState("");

  const submitForm = e => {
    e.preventDefault();

    addBookMutation({
      variables: {
        name,
        genreId: genreId ? genreId : genres[0].id,
        authorId: authorId ? authorId : authors[0].id
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  return (
    <>
      <form id="add-book" onSubmit={submitForm}>
        <div className="field">
          <label>Book name</label>
          <input type="text" onChange={e => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Genre</label>
          <select onChange={e => setGenreId(e.target.value)}>
            {loading ? (
              <option>...loading genres</option>
            ) : (
              genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="field">
          <label>Author</label>
          <select onChange={e => setAuthorId(e.target.value)}>
            {loading ? (
              <option>...loading authors</option>
            ) : (
              authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))
            )}
          </select>
        </div>
        <button type="submit">+</button>
      </form>
    </>
  );
};

export default flowright(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(getGenresQuery, { name: "getGenresQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
