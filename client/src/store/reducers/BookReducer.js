import {
  BOOK_FETCH_SUCCESS,
  BOOK_FETCH_ERROR,
  BOOK_CREATE_SUCCESS,
  BOOK_UPDATE_SUCCESS,
  BOOK_DELETE_SUCCESS,
  BOOK_SEARCH_SUCCESS,
} from "../action/actionType";

const initialState = {
  books: [],
  error: null, 
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case BOOK_FETCH_SUCCESS:
      return {
        ...state,
        books: action.payload,
        error: null,
      };

    case BOOK_FETCH_ERROR:
      return {
        ...state,
        error: action.payload, 
      };

    case BOOK_CREATE_SUCCESS:
      return {
        ...state,
        books: [...state.books, action.payload], 
        error: null, 
      };

    case BOOK_UPDATE_SUCCESS:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book 
        ),
        error: null,
      };

    case BOOK_DELETE_SUCCESS:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload), 
        error: null, 
      };

    case BOOK_SEARCH_SUCCESS:
      return {
        ...state,
        books: action.payload, 
        error: null, 
      };

    default:
      return state;
  }
}
