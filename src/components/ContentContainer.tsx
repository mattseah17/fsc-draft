import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import PremiseCard from "./PremiseCard";

const ContentContainer: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "1318px",
        height: "827px",
        padding: "32px",
        gap: "32px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .Mui-selected": {
              color: "#0073ED",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#0073ED",
              height: "2px",
            },
          }}
        >
          <Tab
            label="Draft"
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "21.79px",
              textTransform: "none",
            }}
          />
          <Tab
            label="Finalised"
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "21.79px",
              textTransform: "none",
            }}
          />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", gap: "30px" }}>
        <PremiseCard
          title="Premises"
          subTitle="Paya Lebar Fire Station"
          count="0 / 39"
        />
        <PremiseCard title="Premises" subTitle="ROTA 1" count="0" />
        <PremiseCard title="Premises" subTitle="ROTA 2" count="0" />
        <PremiseCard title="Premises" subTitle="ROTA 3" count="0" />
      </Box>
    </Box>
  );
};

export default ContentContainer;
