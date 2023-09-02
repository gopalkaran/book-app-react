import { combineReducers, createStore } from "redux";
import { BooksReducer } from "./booksReducer";

export const store = createStore(
  combineReducers({
    books: BooksReducer
  })
);
