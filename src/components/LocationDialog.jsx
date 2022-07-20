import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DialogContentText,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { memo, useContext, useEffect, useState } from "react";
import API from "../utils/PokemonAPI";
import { FeedbackContext } from "../contexts/FeedbackContext";

const LocationDialog = ({ open, handleClose, url }) => {
  const [data, setdata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { feedbackDispatch } = useContext(FeedbackContext);

  useEffect(() => {
    if (url && open)
      API.getLocation(setIsLoading, setdata, url.slice(18), () => {
        handleClose();
        feedbackDispatch({ type: "SET_SNACKBAR", payload: true });
      });
  }, [open]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Location Encounters
      </DialogTitle>
      {isLoading && <LinearProgress color="secondary" />}
      <DialogContent>
        {data && data.length !== 0 && (
          <List sx={{ height: `20rem` }}>
            {data &&
              data.map((location, index) => (
                <ListItem key={index}>
                  <ListItemText primary={location.location_area.name} />
                </ListItem>
              ))}
          </List>
        )}
        {data && data.length === 0 && (
          <Typography variant="body1">No Location Encounters</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default memo(LocationDialog);
