import React from "react";
import { Box, SxProps, Theme, Typography } from "@mui/material";

interface EmptyStateProps {
  message: string;
  subMessage?: string;
  sx?: SxProps<Theme>;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  subMessage,
  sx,
}) => (
  <Box sx={sx}>
    <Box
      component="img"
      src="src/assets/empty_state.png"
      alt="Empty state illustration"
      sx={{ mb: 3, width: 200 }}
    />
    <Typography variant="h6" gutterBottom>
      {message}
    </Typography>
    {subMessage && (
      <Typography variant="body2" color="text.secondary">
        {subMessage}
      </Typography>
    )}
  </Box>
);
