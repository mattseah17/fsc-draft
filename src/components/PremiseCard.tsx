import { Avatar, Box } from "@mui/material";

import { Typography } from "@mui/material";

const PremiseCard: React.FC<{
  title: string;
  subTitle: string;
  count: string;
}> = ({ title, subTitle, count }) => {
  return (
    <Box
      sx={{
        width: "251px",
        height: "45px",
        borderRadius: "16px",
        border: "1px solid #EEEEEE",
        padding: "16px 20px",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Avatar
          alt="User Avatar"
          src="/path/to/user/avatar.jpg" // Replace with actual image path
          sx={{
            width: 40,
            height: 40,
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#000000",
            }}
          >
            {count} {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              color: "#6B7280",
            }}
          >
            {subTitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PremiseCard;
