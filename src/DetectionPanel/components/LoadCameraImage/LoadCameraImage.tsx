import { Box, Button, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { SelectCameraModal } from "..";

export const LoadCameraImage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <Box width="30%" margin="auto" display="flex" flexDirection="column">
        <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/482/482929.png"
            alt="no cameras connected"
            height="300px"
            width="300px"
        />

        <Typography variant="h6" > No cuenta con alguna cámara conectada al sistema. </Typography>
        <Button 
            startIcon={<AddIcon/>}
            variant="contained"
            onClick={handleOpen}
            sx={{marginTop:"30px", display:"flex", alignSelf: "center"}}
        > 
            Conectar cámara
        </Button>
        <SelectCameraModal open={open} handleClose={handleClose} />
    </Box>
  )
}
