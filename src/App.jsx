import React, { useContext } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import PokemonList from "./pages/PokemonList";
import PokemonViewer from "./pages/PokemonViewer";
import { FeedbackContext } from "./contexts/FeedbackContext";

const App = () => {
  const { feedbackState, snackbarDispatch } = useContext(FeedbackContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          {location.pathname !== "/" && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate(-1)}
            >
              <ChevronLeft />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokedex
          </Typography>
        </Toolbar>
        {feedbackState.showLoading && <LinearProgress color="secondary" />}
      </AppBar>
      <Box
        sx={{ paddingTop: 2, paddingBottom: 2, overflowY: "auto", flexGrow: 1 }}
      >
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/:pokemonName" element={<PokemonViewer />} />
        </Routes>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: feedbackState.vertical,
          horizontal: feedbackState.horizontal,
        }}
        open={feedbackState.isOpen}
        autoHideDuration={feedbackState.duration}
        onClose={() =>
          snackbarDispatch({ type: "CLOSE_SNACKBAR", payload: false })
        }
      >
        <Alert
          onClose={() =>
            snackbarDispatch({ type: "CLOSE_SNACKBAR", payload: false })
          }
          severity={feedbackState.severity}
          variant="filled"
        >
          {feedbackState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
