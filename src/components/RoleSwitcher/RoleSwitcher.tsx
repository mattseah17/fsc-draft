import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const RoleSwitcher: React.FC = () => {
  const { login } = useAuth();

  const users = [
    {
      id: "1",
      name: "Tony Doe",
      email: "tony_doe@scdf.gov.sg",
      role: "ENFORCEMENT_OIC" as const,
    },
    {
      id: "2",
      name: "Tan Ah Kow",
      email: "tan_ah_kow@scdf.gov.sg",
      role: "ROTA_COMMANDER" as const,
      rotaNumber: 1,
    },
    {
      id: "3",
      name: "Lim Teh Peng",
      email: "lim_teh_peng@scdf.gov.sg",
      role: "ROTA_COMMANDER" as const,
      rotaNumber: 2,
    },
    {
      id: "4",
      name: "Ong Boon Hoe",
      email: "ong_boon_hoe@scdf.gov.sg",
      role: "ROTA_COMMANDER" as const,
      rotaNumber: 3,
    },
  ];

  return (
    <ButtonGroup
      size="small"
      sx={{
        "& .MuiButton-root": {
          fontSize: "12px",
          textTransform: "none",
          padding: "4px 8px",
        },
      }}
    >
      {users.map((user) => (
        <Button key={user.id} onClick={() => login(user)}>
          {user.role === "ROTA_COMMANDER" ? `RC ${user.rotaNumber}` : "OIC"}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default RoleSwitcher;
