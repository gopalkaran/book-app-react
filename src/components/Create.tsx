import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookBody } from "../types";

const validationSchema = Yup.object({
  ISBN: Yup.string().required("ISBN is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  publisher: Yup.string().required("Publisher is required")
});

const addNewBook = async (values: BookBody) => {
  const response = await fetch("https://i076ge.sse.codesandbox.io/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    throw new Error(body.message);
  }
};

export default function Create() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { ISBN: "", title: "", description: "", publisher: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      addNewBook(values)
        .then((book) => {
          console.log("Book created successfully", book.id);
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
          Create Book
        </Typography>

        <TextField
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
