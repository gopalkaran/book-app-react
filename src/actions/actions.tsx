import { BookBody, Book } from "../types";

export const addBook = (data: BookBody) => {
  return {
    type: "ADD_BOOK",
    payload: data
  };
};

export const saveBooks = (data: Array<Book>) => {
  return {
    type: "SAVE_BOOKS",
    payload: data
  };
};

export const updateBook = (data: BookBody) => {
  return {
    type: "UPDATE_BOOK",
    payload: data
  };
};
