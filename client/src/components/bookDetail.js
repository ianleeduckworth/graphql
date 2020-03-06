import React from "react";
import {
  getBookQuery,
  getBooksQuery,
  deleteBookMutation
} from "../queries/queries";
import { graphql } from "react-apollo";
import flowRight from "lodash.flowright";

const BookDetails = props => {
  const { getBookQuery, deleteBookMutation, bookId } = props;
  let { book, loading } = getBookQuery;

  let g = [];
  if (book && book.author && book.author.books) {
    book.author.books.forEach(item => g.push(item.genre));
  }
  const genres = [...new Set(g)];

  const deleteBook = e => {
    e.preventDefault();
    deleteBookMutation({
      variables: {
        id: bookId
      },
      refetchQueries: [{ query: getBooksQuery }]
    }).then(e => getBookQuery.refetch());
  };

  return (
    <div id="book-details">
      {loading && !book && <h3>Loading...</h3>}
      {!loading && !book && <h3>Click on a book title to see details</h3>}
      {!loading && book && (
        <>
          <h2>{`Book name: ${book.name}`}</h2>
          <p>{`Book genre: ${book.genre.name}`}</p>
          <h3>Author Information</h3>
          <h4>{`Name: ${book.author.name}`}</h4>
          <h4>{`Age: ${book.author.age}`}</h4>
          <h4>Books written</h4>
          <ul>
            {book.author.books.map(b => (
              <li key={b.id}>{b.name}</li>
            ))}
          </ul>
          <h4>Genres:</h4>
          <ul>
            {genres.map(g => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
          <button onClick={deleteBook}>Delete book</button>
        </>
      )}
    </div>
  );
};

export default flowRight(
  graphql(getBookQuery, {
    options: props => ({
      variables: {
        id: props.bookId
      }
    }),
    name: "getBookQuery"
  }),
  graphql(deleteBookMutation, {
    name: "deleteBookMutation"
  })
)(BookDetails);
