import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { CamerasContext } from "../../../context";
import { CameraConected } from "../../../interfaces";

export const CamerasConnectedStatus = () => {
    const { systemConnectedCameras, disconnectCamera } = useContext(CamerasContext)

  return (
    <>
      {
        systemConnectedCameras.map(( camera: CameraConected )=> (
          <Box
          height="80px"
          width="300px"
          sx={{backgroundColor: "#F3F3F3"}}
          >
            <Box display="flex">
            <Box 
              component="img" 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Green_Light_Icon.svg/1024px-Green_Light_Icon.svg.png" 
              height="20px"
              width="20px"
              marginRight="5px"
            />
            <Typography variant="body1">{camera.nombre}({camera.id.substring(0,15)}...)</Typography>
            </Box> 
            <Button 
              sx={{backgroundColor:"red", marginTop:"10px"}}
              size="small"
              variant="contained"
              onClick={()=>{disconnectCamera(camera.id)}}
              >
                Desconectar 
              </Button>
          </Box>
        ))
      }
    </>
  )
}
