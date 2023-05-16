import { CamerasState } from '..';
import { CameraConected, Devices } from '../../interfaces';

type CamerasAction=
| { type: '[Cameras] - load connected cameras', payload: CameraConected[]}
| { type: '[Cameras] - connect camera', payload: CameraConected }
| { type: '[Cameras] - disconnect camera', payload: string }
| { type: '[Cameras] - load device connected cameras', payload: Devices[]}


export const CamerasReducer = ( state: CamerasState , action: CamerasAction ): CamerasState => {

     switch ( action.type ) {

        case '[Cameras] - load connected cameras':
            return { ...state, systemConnectedCameras: action.payload }

        case '[Cameras] - load device connected cameras':
            return { ...state, deviceConnectedCameras: action.payload }

        case "[Cameras] - connect camera":

            return { ...state, systemConnectedCameras:[...state.systemConnectedCameras, action.payload] };

        case "[Cameras] - disconnect camera":
            return { 
                ...state, 
                systemConnectedCameras: state.systemConnectedCameras.filter((camera: CameraConected)=> camera.id != action.payload) };

          default:
               return state;
     }

}