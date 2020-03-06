import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetail from "./bookDetail";

const BookList = props => {
  const { data } = props;
  const { books, loading } = data;

  const [selectedBookId, setSelectedBookId] = useState(0);

  return (
    <>
      {loading && <h3>...loading</h3>}
      {!loading && (
        <>
          <ul id="book-list">
            {books.map(book => (
              <li
                key={book.id}
                onClick={() => setSelectedBookId(book.id)}
              >{`${book.name} by ${book.author.name}`}</li>
            ))}
          </ul>
          <BookDetail bookId={selectedBookId} />
        </>
      )}
    </>
  );
};

export default graphql(getBooksQuery)(BookList);
