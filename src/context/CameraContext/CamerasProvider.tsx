import { FC, useCallback, useEffect, useReducer } from 'react';
import { CamerasContext, CamerasReducer } from '..';
import { localStorageManager } from '../../utils';
import { CameraConected, Devices } from '../../interfaces';

export interface CamerasState {
     systemConnectedCameras: CameraConected[];
     deviceConnectedCameras: Devices[];
}

const CAMERAS_INITIAL_STATE: CamerasState={
     systemConnectedCameras: [],
     deviceConnectedCameras: []
}

interface Props{
     children: React.ReactNode
}

export const CamerasProvider:FC<Props> = ({ children }) => {
     const [state, dispatch] = useReducer( CamerasReducer, CAMERAS_INITIAL_STATE );

     const loadConnectedCameras = useCallback(() =>{
          const localStorageCamerasInfo: CameraConected[] = localStorageManager.getCamerasConected();
          if(localStorageCamerasInfo.length===0){
               localStorage.setItem("camerasConected","[]")
          }
          dispatch({ type: '[Cameras] - load connected cameras', payload: localStorageCamerasInfo });
     }, []);

     const connectCamera = useCallback((id: string, nombre: string) =>{
          localStorageManager.connectCamera(id, nombre);
          dispatch({ type: '[Cameras] - connect camera', payload: {id,nombre} });
     },[])

     const disconnectCamera = useCallback((id: string) =>{
          localStorageManager.disconnectCamera(id);
          dispatch({ type: '[Cameras] - disconnect camera', payload: id });
     },[])
   
     const getDeviceConnectedDevices = async() =>{
          const devices = await navigator.mediaDevices.enumerateDevices();
          const camerasConnected = devices.filter((camera: Devices) => camera.kind==="videoinput");
          dispatch({ type: '[Cameras] - load device connected cameras', payload: camerasConnected });
     }

     const setConnectedDevices = (mediaDevices:any) => {
          const camerasConnected = mediaDevices.filter((device: any) => device.kind === "videoinput")
          dispatch({ type: '[Cameras] - load device connected cameras', payload: camerasConnected});
     }

     useEffect(()=>{
          loadConnectedCameras();
     },[])

     useEffect(
       () => {
          getDeviceConnectedDevices()
       },
       []
     );

     // useEffect(    () => {
     //      navigator.mediaDevices.enumerateDevices().then(setConnectedDevices);
     //    }, [])


     return (
          <CamerasContext.Provider value={{
               ...state,
               loadConnectedCameras,
               connectCamera,
               disconnectCamera, 
               }} >
               {children}
          </CamerasContext.Provider>
     )
}
