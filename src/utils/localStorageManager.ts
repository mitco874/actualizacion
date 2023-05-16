import { CameraConected } from "../interfaces";

export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
}

export const getToken = (): string | null => {
    return localStorage.getItem("token");
}

export const getCamerasConected = (): CameraConected[] => {
    const camerasList: string | null = localStorage.getItem("camerasConected");

    if(!camerasList){
        return [];
    }

    return JSON.parse(camerasList);
}

export const connectCamera = (id: string, nombre: string) =>{
    const camerasConected: CameraConected[] = getCamerasConected();
    
    if(!isConnectedCamera(id)){
        camerasConected.push({id, nombre});
        localStorage.setItem("camerasConected", JSON.stringify(camerasConected));
    }
}

const isConnectedCamera = (id: string): boolean =>{
    const camerasConected: CameraConected[] = getCamerasConected();
    const isConnectedCamera = camerasConected.filter((camera: CameraConected)=>( camera.id === id));
    return (isConnectedCamera.length > 0);
} 

export const disconnectCamera = (id: string) =>{
    const camerasConected: CameraConected[] = getCamerasConected();

    if(isConnectedCamera(id)){
        const newCamerasConnectedState = camerasConected.filter((camera: CameraConected)=>camera.id !== id);
        localStorage.setItem("camerasConected", JSON.stringify(newCamerasConnectedState));
    }
}