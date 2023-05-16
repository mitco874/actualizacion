import { Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { CamerasConnectedStatus } from "..";
import { CamerasContext } from "../../../context";

export const CameraImage = () => {
  const webcamRef = useRef(null);
  const [websckt, setWebsckt] = useState<WebSocket>();
  const { systemConnectedCameras } = useContext(CamerasContext);
  const [procesedImage, setProcesedImage] = useState<string>("")


  const getBase64WebcamImage = () => {
      if(systemConnectedCameras.length > 0 ){
        return webcamRef.current!.getScreenshot();
      }
        return "";
    }

    // useEffect(()=>{
    //   const intervalId = setInterval(()=>console.log("mensaje"),100);
    //   return ()=>(clearInterval(intervalId));
    // },[])    

    useEffect(() => {
      const url = "ws://35.219.130.180:5000/test/1";
      const ws = new WebSocket(url);
  
      ws.onopen = (event) => {
        ws.send("Connect");
      };
  
      ws.onmessage = (e) => {
        console.log(JSON.parse(e.data))
      };
  
      setWebsckt(ws);

      return () => ws.close();
    }, []);
  
    const sendMessage = () => {
      if(websckt){
        websckt.send(getBase64WebcamImage());
      
        websckt.onmessage = (e) => {
          //ToDo crear interfaz
          const {message} = JSON.parse(e.data)
          setProcesedImage(message);
      };
    }
    };

      useEffect(()=>{
      const intervalId = setInterval(()=>sendMessage(),100);
      return ()=>(clearInterval(intervalId));
    },[websckt])    

  // useEffect(()=>{
  //   const interval= setInterval(()=>{capture()},500)
  //   return (clearInterval(interval));
  // },[])

  return (
    <Grid container spacing={3}> 
        <Grid item>
            <Webcam 
              ref={webcamRef}
              audio={false} 
              videoConstraints={{ 
                deviceId: systemConnectedCameras[0].id,
                facingMode: "user"
              }} 
            />
        </Grid>
        <Grid item>
              <img src={procesedImage} alt="processed image" />
        </Grid>
        <Grid item>
            <CamerasConnectedStatus/>
        </Grid>     
    </Grid>
  )
}


