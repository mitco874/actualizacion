import { FC, useContext } from "react";

import { Button, TextField, InputLabel, Typography, Modal, Box, MenuItem } from "@mui/material";
import "./SelectCameraModal.css";

import { useForm } from "react-hook-form";
import { CamerasContext } from "../../../context";
import { Devices } from "../../../interfaces";

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface addCameraForm {
    id: string;
    name: string;
}

const initialAddCameraFormState: addCameraForm = {
    id:"",
    name:""
}

export const SelectCameraModal: FC<Props> = ({ open, handleClose }) => {
  const { register, handleSubmit, formState: { errors }  } = useForm<addCameraForm>({ defaultValues: initialAddCameraFormState })
  const { deviceConnectedCameras,connectCamera } = useContext(CamerasContext);

  const connectCameraToSystem = (cameraData: addCameraForm) =>{
    connectCamera(cameraData.id,cameraData.name)
    setTimeout(()=>{handleClose()},1000)
  }

  return (
    <Modal open={open} onClose={handleClose} >
      <Box className="select-camera-modal">

        <Typography variant="h6" component="h2">
          Selecciona una camara
        </Typography>

        <form onSubmit={handleSubmit(connectCameraToSystem)}>
            <InputLabel>
                Nombre de la cámara*:
            </InputLabel> 
            <TextField 
                variant="outlined" 
                size="small"
                fullWidth
                margin="normal"
                {...register("name",{ 
                    required: "Este campo es obligatorio",
                })}
                error={!!errors.name}
                helperText = {errors.name?.message} 
            />

            <InputLabel>
                Modelo de cámara:
            </InputLabel> 
            <TextField 
                variant="outlined" 
                size="small"
                fullWidth
                select
                margin="normal"
                {...register("id",{ 
                    required: "Este campo es obligatorio",
                })}
                error={!!errors.id}
                helperText = {errors.id?.message} 
            >
                {
                    deviceConnectedCameras.map(
                        (cameraDevice:Devices, index: number)=>(
                            <MenuItem key={cameraDevice.deviceId} value={cameraDevice.deviceId}>
                                {cameraDevice.label.length === 0 ? `camera ${index}`: cameraDevice.label }
                            </MenuItem>
                        )
                    )

                }
            </TextField>

            <Button 
                variant="contained" 
                type="submit"
            >
                Agregar cámara
            </Button>


        </form>


      </Box>
    </Modal>
  );
};