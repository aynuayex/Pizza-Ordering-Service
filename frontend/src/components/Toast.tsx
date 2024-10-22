import { Alert, AlertProps, Snackbar } from '@mui/material'
import React, { useState } from 'react'

type ToastProps = {
    message: string;
    severity?: AlertProps["severity"];
}

const Toast = ({message, severity}: ToastProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    console.log(e);
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
          autoHideDuration={8000}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity={severity} variant="filled" onClose={handleClose}>
            {message}
          </Alert>
        </Snackbar>
  )
}

export default Toast