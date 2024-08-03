import {
  BOOK_FETCH_SUCCESS,
  BOOK_FETCH_ERROR,
  BOOK_CREATE_SUCCESS,
  BOOK_UPDATE_SUCCESS,
  BOOK_DELETE_SUCCESS,
  BOOK_SEARCH_SUCCESS,
} from "./actionType";

export const bookFetchSuccess = (data) => ({
  type: BOOK_FETCH_SUCCESS,
  payload: data,
});

export const bookFetchError = (error) => ({
  type: BOOK_FETCH_ERROR,
  payload: error,
});

export const bookCreateSuccess = (data) => ({
  type: BOOK_CREATE_SUCCESS,
  payload: data,
});

export const bookUpdateSuccess = (data) => ({
  type: BOOK_UPDATE_SUCCESS,
  payload: data,
});

export const bookDeleteSuccess = (id) => ({
  type: BOOK_DELETE_SUCCESS,
  payload: id,
});

export const bookSearchSuccess = (data) => ({
  type: BOOK_SEARCH_SUCCESS,
  payload: data,
});

export function fetchAllBooks() {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:8000/bukus");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      dispatch(bookFetchSuccess(result.data));
    } catch (error) {
      dispatch(bookFetchError(error.message));
    }
  };
}

export function fetchBookById(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/bukus/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      dispatch(bookFetchSuccess([result.data]));
    } catch (error) {
      dispatch(bookFetchError(error.message));
    }
  };
}

export function createBook(bookData) {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:8000/bukus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      dispatch(bookCreateSuccess(result.data));
    } catch (error) {
      dispatch(bookFetchError(error.message));
    }
  };
}

export function updateBook(id, bookData) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/bukus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      dispatch(bookUpdateSuccess(result.data));
    } catch (error) {
      dispatch(bookFetchError(error.message));
    }
  };
}

export function deleteBook(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/bukus/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      dispatch(bookDeleteSuccess(id));
    } catch (error) {
      dispatch(bookFetchError(error.message));
    }
  };
}

export function searchBooks(query) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/bukus/search/${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      dispatch(bookSearchSuccess(result.data));
    } catch (error) {
      dispatch(bookFetchError(error.message));
    }
  };
}
