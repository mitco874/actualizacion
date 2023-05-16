import { createContext } from 'react';
import { CameraConected, Devices } from '../../interfaces';

interface ContextProps{
     systemConnectedCameras: CameraConected[];
     deviceConnectedCameras: Devices[];
     loadConnectedCameras: () => void;
     connectCamera: (id: string, nombre: string) => void;
     disconnectCamera: (id: string) => void;
}

export const CamerasContext =createContext({} as ContextProps );