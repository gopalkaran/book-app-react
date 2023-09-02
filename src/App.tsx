import "./styles.css";

import {
  Routes,
  Route,
  Navigate,
  Location,
  useLocation,
  useNavigate
} from "react-router-dom";
import BookList from "./components/BookList";
import Update from "./components/Update";
import DetailsModal from "./components/DetailsModal";
import Create from "./components/Create";
import Navbar from "./components/Navbar";
import { Box, Drawer } from "@mui/material";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  console.log(navigate);
  let state = location.state as { backgroundLocation?: Location };
  let isModalRoute = state?.backgroundLocation ? true : false;
  return (
    <Box>
      <Navbar />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Navigate replace to="/books" />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
      <Drawer
        open={isModalRoute}
        anchor="right"
        onClose={() => {
          navigate(-1);
        }}
      >
        <Box p={2} sx={{ width: 400 }}>
          <Routes>
            <Route path="/books/create" element={<Create />} />
            <Route path="/books/update/:bookid" element={<Update />} />
            <Route path="/books/:bookid" element={<DetailsModal />} />
          </Routes>
        </Box>
      </Drawer>
    </Box>
  );
}
