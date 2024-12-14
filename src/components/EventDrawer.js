import React from "react";
import { Drawer, Box, Typography, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Divider, IconButton, Rating } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function EventDrawer({ open, onClose, eventName, setEventName, selectedProviders, handleSaveEvent, totalCost, onRemoveProvider }) {
  const ratings = selectedProviders
    .map((provider) => {
      const ratingTag = provider.tags.find((tag) => tag.toLowerCase().startsWith("rating:"));
      return ratingTag ? parseFloat(ratingTag.split(":")[1]) : null;
    })
    .filter((val) => val !== null);

  const averageRating = ratings.length > 0 ? ratings.reduce((acc, val) => acc + val, 0) / ratings.length : 0;

  const textFieldProps = {
    variant: "standard",
    InputProps: {
      disableUnderline: true,
      sx: {
        fontSize: "0.85rem",
        fontWeight: "bold",
        paddingY: 0.8,
        paddingLeft: "1rem",
      },
    },
    InputLabelProps: {
      sx: {
        fontSize: "0.85rem",
        fontWeight: "bold",
        transform: "translate(1rem, 0.6rem)",
      },
    },
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="persistent"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      PaperProps={{
        sx: {
          top: "64px",
          height: "calc(100% - 64px)",
          width: 325,
        },
      }}
    >
      <Box sx={{ width: "100%", height: "100%", p: 2, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" gutterBottom>
          Create Event
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "999px",
            boxShadow: 3,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "grey.300",
            px: 1,
            mt: 1,
            width: "85%",
          }}
        >
          <TextField
            {...textFieldProps}
            fullWidth
            label="Name Event"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name..."
            sx={{
              flex: 1,
              mr: 1,
            }}
          />
        </Box>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Selected Providers:
        </Typography>
        <List sx={{ p: 0, mt: 2 }}>
          {selectedProviders.map((provider) => {
            const ratingTag = provider.tags.find((tag) => tag.toLowerCase().startsWith("rating:"));
            const ratingValue = ratingTag ? parseFloat(ratingTag.split(":")[1]) : null;
            const categoryText = provider.categories.join(" | ");

            return (
              <ListItem
                key={provider.id}
                sx={{ alignItems: "flex-start", p: 0, mb: 2 }}
                secondaryAction={
                  <IconButton aria-label="remove" onClick={() => onRemoveProvider(provider.id)}>
                    <CloseIcon sx={{ color: "red" }} />
                  </IconButton>
                }
              >
                <ListItemAvatar sx={{ minWidth: 0, mr: 1, mt: 0 }}>
                  <Avatar variant="square" src={provider.image} sx={{ width: 60, height: 60, borderRadius: 1 }} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ mt: 0 }}
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {provider.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {categoryText}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          Price: ${provider.price.toFixed(2)}
                        </Typography>
                        {ratingValue && (
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                            ★ {ratingValue.toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                    </>
                  }
                />
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ my: 2 }} />

        {selectedProviders.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mr: 1 }}>
              Average Rating
            </Typography>
            <Rating name="average-rating" value={averageRating} precision={0.25} readOnly size="small" sx={{ mr: 1 }} />
            <Typography variant="body2">{averageRating.toFixed(2)}</Typography>
          </Box>
        )}

        <Typography variant="h6" sx={{ mb: 2 }}>
          Total Cost: ${totalCost.toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSaveEvent}
          sx={{
            mb: 1,
            width: "90%",
            height: "2.5rem",
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          MAKE EVENT
        </Button>
        <Button variant="text" color="secondary" fullWidth onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Drawer>
  );
}

export default EventDrawer;
