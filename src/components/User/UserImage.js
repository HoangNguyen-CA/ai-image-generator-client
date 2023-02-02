import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ImageFrame from "components/ImageFrame";
import { useState } from "react";

function UserImage({ image, onDelete }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ImageFrame imageURL={image.image_url} prompt={image.prompt} />
      <Typography variant="subtitle1" sx={{ my: 0.5 }}>
        {image.prompt}
      </Typography>
      <Button variant="text" onClick={() => setOpen(true)}>
        Delete Image
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this image?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={onDelete}>
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserImage;
