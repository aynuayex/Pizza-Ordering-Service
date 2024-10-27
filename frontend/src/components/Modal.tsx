import { Box, Dialog, DialogContent, Typography } from '@mui/material'

import right from "@/assets/right.svg";

interface Modal {
    text: string,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const Modal = ({text, open, setOpen} : Modal) => {

  return (
    <Dialog
        PaperProps={{
          sx: {
            width: " 857px",
            padding: "80px 128px",
            borderRadius: "20px",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "281.33px",
                height: "281.33px",
                borderRadius: "50%",
                bgcolor: "#05C6051A",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "166.66px",
                  height: "166.66px",
                  borderRadius: "50%",
                  bgcolor: "#05C605",
                }}
              >
                <img src={right} alt="done or right image" />
              </Box>
            </Box>
            <Typography
              sx={{
                color: "#05C605",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "46.3px",
                letterSpacing: "0.03em",
                textAlign: "center",
              }}
            >
              {text}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
  )
}

export default Modal