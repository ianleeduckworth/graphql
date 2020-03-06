import { gql } from "apollo-boost";

//QUERIES

export const getGenresQuery = gql`
  {
    genres {
      name
      id
    }
  }
`;

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre {
        name
        id
      }
      id
      author {
        name
        age
        id
        books {
          name
          id
          genre {
            name
            id
          }
        }
      }
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      name
      id
      author {
        name
      }
    }
  }
`;

// MUTATIONS

export const addBookMutation = gql`
  mutation($name: String!, $genreId: ID!, $authorId: ID!) {
    addBook(name: $name, genreId: $genreId, authorId: $authorId) {
      name
      id
    }
  }
`;

export const deleteBookMutation = gql`
  mutation($id: ID!) {
    deleteBook(id: $id) {
      name
      id
    }
  }
`;
