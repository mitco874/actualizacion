import { useContext, useEffect } from "react"
import { DetectionPanelLayout } from "../../layouts"
import { CamerasContext } from "../../../context"
import { CameraImage, LoadCameraImage } from "../../components";

export const SurveillancePage = () => {
  const { systemConnectedCameras } = useContext(CamerasContext);
  return (
    <DetectionPanelLayout>
      {systemConnectedCameras.length === 0 ? 
        (<LoadCameraImage/>)
        :
        (<CameraImage/>)
    }
    </DetectionPanelLayout>
  )
}
