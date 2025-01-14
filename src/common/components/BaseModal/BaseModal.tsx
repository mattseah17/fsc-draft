import React from "react";
import { Dialog, DialogProps } from "@mui/material";

interface BaseModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  footer?: React.ReactNode;
  modalProps?: Partial<DialogProps>;
  onSave?: () => void;
  saveDisabled?: boolean;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  children,
  open,
  onClose,
  title,
  footer,
  modalProps,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} {...modalProps}>
      {title}
      {children}
      {footer}
    </Dialog>
  );
};
