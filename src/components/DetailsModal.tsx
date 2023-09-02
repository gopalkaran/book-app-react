import * as React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Book } from "../types";
import { BooksState } from "../store/booksReducer";

async function getBookById<T>(bookId: string): Promise<T> {
  const response = await fetch(
    "https://i076ge.sse.codesandbox.io/books" + bookId
  );
  const body = await response.json();
  if (response.ok) {
    return body;
  }
  throw new Error(body.message);
}

export default function DetailsModal() {
  const { bookid } = useParams();
  const bookList = useSelector((state: { books: BooksState }) => state.books);
  const bookFromStore = bookList.find((book: Book) => book.id === bookid);
  const [book, setBook] = React.useState(bookFromStore);
  React.useEffect(() => {
    if (!bookFromStore) {
      getBookById<Book>(bookid || "").then((b) => setBook(b));
    }
  }, [bookid, bookFromStore]);

  return (
    <div>
      {book && (
        <React.Fragment>
          <List>
            <ListItem button>
              <ListItemText primary={book.ISBN} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={book.title} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={book.description} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={book.publisher} />
            </ListItem>
          </List>
        </React.Fragment>
      )}
    </div>
  );
}
