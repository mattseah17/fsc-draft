import React from "react";
import { Box, Typography } from "@mui/material";
import { styles } from "../styles";

interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <Box sx={styles.emptyState}>
    <Box
      component="img"
      src="src/assets/empty_state.png"
      alt="Empty state illustration"
      sx={{ mb: 3, width: 200 }}
    />
    <Typography variant="body1" color="text.secondary">
      {message}
    </Typography>
  </Box>
);
