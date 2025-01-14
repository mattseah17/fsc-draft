import React from "react";
import { Dialog, DialogProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material";

interface BaseModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  footer?: React.ReactNode;
  modalProps?: Partial<DialogProps>;
  onSave?: () => void;
  saveDisabled?: boolean;
  sx?: SxProps<Theme>;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  children,
  open,
  onClose,
  title,
  footer,
  modalProps,
  sx,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={sx}
      keepMounted={false}
      aria-labelledby="modal-title"
      {...modalProps}
    >
      <div id="modal-title">{title}</div>
      {children}
      {footer}
    </Dialog>
  );
};
