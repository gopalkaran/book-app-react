import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Book } from "../types";
import { saveBooks } from "../actions/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { BooksState } from "../store/booksReducer";
export default function BookList() {
  const bookList = useSelector((state: { books: BooksState }) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const goToUpdatePage = (id: string) => {
    navigate(`/books/update/${id}`, {
      state: { backgroundLocation: location }
    });
  };

  const goToDetailsPage = (id: string) => {
    navigate(`/books/${id}`, { state: { backgroundLocation: location } });
  };

  useEffect(() => {
    fetch("https://i076ge.sse.codesandbox.io/books")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        dispatch(saveBooks(res));
      });
  }, []);

  return (
    <Box p={2} role="presentation">
      <Typography variant="h6">Book List</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ISBN</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Publisher</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Update/View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookList.map((row: Book) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.ISBN}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.publisher}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <Button
                    color="inherit"
                    variant="contained"
                    onClick={() => goToUpdatePage(row.id)}
                  >
                    Update
                  </Button>
                  <Button
                    color="inherit"
                    variant="contained"
                    onClick={() => goToDetailsPage(row.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
