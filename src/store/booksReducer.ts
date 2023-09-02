import { AnyAction } from "redux";
import { Book } from "../types";

export type BooksState = Array<Book>;
const initialState: BooksState = [];
export function BooksReducer(
  state: BooksState = initialState,
  action: AnyAction
): BooksState {
  switch (action.type) {
    case "ADD_BOOK":
      return state.concat(action.payload);
    case "SAVE_BOOKS":
      state = [...action.payload];
      return state;

    default:
      return state;
  }
}
