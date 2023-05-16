import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import "./AuthLayout.css"

interface Props { 
    children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({ children }) => {

  return (
    <Box 
      display="flex" 
      flexDirection="row" 
      height="100vh" 
      width="100vw" 
    >
      <Box 
        className="background-image" 
        component="aside" 
        width="45%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
          <Box  
            component="img"
            sx={{
              height: 220,
              width: 240,
            }}
            alt="Eagle"
            src="../src/assets/eagle.png"
          />    
      </Box>
      <Box 
        component="aside" 
        className="form-section" 
        width="55%"
      >
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center"
              >
              <Typography 
                variant="h4" 
                component="h1"
                > Sistema de detección de conducta criminal. </Typography>
              <Typography variant="h5" component="p">Bienvenido!</Typography>
            </Box>

            <Box padding="3%">
                {children}
            </Box>

      </Box>
    </Box>
  )
}
