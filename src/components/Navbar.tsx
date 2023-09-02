import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const navigation = useNavigate();
  const location = useLocation();
  const goToBookList = () => {
    navigation("/books");
  };

  const goToCreateBook = () => {
    navigation("/books/create", {
      state: {
        backgroundLocation: location
      }
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" variant="text" onClick={goToBookList}>
            Book List
          </Button>
          <Button color="inherit" variant="text" onClick={goToCreateBook}>
            Create
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
