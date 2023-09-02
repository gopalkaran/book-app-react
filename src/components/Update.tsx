import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography, TextField } from "@mui/material";
import { BookBody, Book } from "../types";
import { useSelector } from "react-redux";
import { BooksState } from "../store/booksReducer";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = Yup.object({
  ISBN: Yup.string().required("ISBN is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  publisher: Yup.string().required("Publisher is required")
});

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

const updateABook = async (values: BookBody, bookId: string) => {
  const response = await fetch(
    `https://i076ge.sse.codesandbox.io/books/${bookId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    }
  );
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    throw new Error(body.message);
  }
};

export default function Update() {
  const navigate = useNavigate();
  const { bookid } = useParams();
  const bookList = useSelector((state: { books: BooksState }) => state.books);
  const bookFromStore = bookList.find((book: Book) => book.id === bookid);
  const [book, setBook] = React.useState(bookFromStore);
  React.useEffect(() => {
    if (!bookFromStore) {
      getBookById<Book>(bookid || "").then((b) => setBook(b));
    }
  }, [bookid, bookFromStore]);

  const formik = useFormik({
    initialValues: {
      ISBN: book.ISBN,
      title: book.title,
      description: book.description,
      publisher: book.publisher
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      updateABook(values, bookid)
        .then((book) => {
          console.log("Book updated successfully", book.id);
          navigate("/books");
        })
        .catch((error) => {
          alert(error);
        });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        p={2}
        role="presentation"
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Typography gutterBottom variant="h6" component="div">
          Update Book
        </Typography>

        <TextField
          sx={{ width: "100%" }}
          label="ISBN"
          variant="standard"
          id="ISBN"
          name="ISBN"
          value={formik.values.ISBN}
          onChange={formik.handleChange}
          error={formik.touched.ISBN && Boolean(formik.errors.ISBN)}
          helperText={formik.touched.ISBN && formik.errors.ISBN}
        />
        <TextField
          sx={{ width: "100%" }}
          id="title"
          label="Title"
          variant="standard"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          sx={{ width: "100%" }}
          id="description"
          label="Description"
          variant="standard"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          sx={{ width: "100%" }}
          id="publisher"
          label="Publisher"
          variant="standard"
          name="publisher"
          value={formik.values.publisher}
          onChange={formik.handleChange}
          error={formik.touched.publisher && Boolean(formik.errors.publisher)}
          helperText={formik.touched.publisher && formik.errors.publisher}
        />
        <Button color="primary" variant="contained" type="submit">
          Create
        </Button>
      </Box>
    </form>
  );
}
