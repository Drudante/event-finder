import React from "react";
import { Drawer, Box, Typography, TextField, List, ListItem, ListItemText, Button, Divider } from "@mui/material";

function EventDrawer({ open, onClose, eventName, setEventName, selectedProviders, handleSaveEvent, totalCost }) {
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
        },
      }}
    >
      <Box sx={{ width: 300, display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Create Event</Typography>
          <TextField label="Name Event" fullWidth margin="normal" variant="outlined" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          <Typography variant="subtitle1">Selected Providers:</Typography>
          <List>
            {selectedProviders.map((provider) => (
              <ListItem key={provider.id}>
                <ListItemText primary={provider.title} secondary={`Price: $${provider.price.toFixed(2)}`} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Total Cost: ${totalCost.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: 1 }} onClick={handleSaveEvent}>
            Save Event
          </Button>
          <Button variant="text" color="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default EventDrawer;
