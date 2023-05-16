import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, InputLabel, Typography, Alert } from "@mui/material";

import { AuthLayout } from "../../layout"
import { localStorageManager, validations } from "../../../utils";
import { sistemaDeteccionApi } from "../../../api";


interface RegisterFormData {
    fullName: string;
    email: string;
    password: string;
    repeated_password: string;
}

interface RegisterState {
    hasError: boolean,
    message: string
  } 
  
  
  const initialRegisterFormState: RegisterFormData = {
    fullName: "",
    email: "",
    password: "",
    repeated_password: "",
  }

export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }  } = useForm<RegisterFormData>({ defaultValues: initialRegisterFormState })
    const [registerState, setRegisterState] = useState<RegisterState>({ hasError: false, message: ""})
    const navigate = useNavigate();
  
    const onLoginSubmit = async (registerFormData: RegisterFormData) => {
      try {
        const {data} = await sistemaDeteccionApi.post("auth/register", registerFormData )
        localStorageManager.saveToken(data.data.access_token)
  
        setTimeout(() => {
          goToDashboard()
        }, 500);
  
      } catch (error: any) {
  
        setRegisterState({message: error.response.data.message, hasError: true});
  
        setTimeout(() => {
          setRegisterState({...registerState, hasError: false});
        }, 2000);
  
      }
    }
  
    const goToDashboard = () => {
      navigate("/surveillance")
    }

  return (
    <AuthLayout>
        { registerState.hasError && (<Alert severity="error">{registerState.message}</Alert>) }

        <form onSubmit={handleSubmit(onLoginSubmit)} style={{display: "flex", flexDirection: "column"}}>
            <InputLabel>
                Nombre completo*:
            </InputLabel> 
            <TextField 
                variant="outlined" 
                size="small"
                fullWidth
                margin="normal"
                {...register("fullName",{ 
                    validate: validations.isNameOrLastName,
                    required: "Este campo es obligatorio",
                })}
                error={!!errors.fullName}
                helperText = {errors.fullName?.message} 
            />

            <InputLabel>
                Correo electrónico*:
            </InputLabel> 
            <TextField 
                variant="outlined" 
                size="small"
                fullWidth
                margin="normal"
                {...register("email",{ 
                    validate: validations.isEmail,
                    required: "Este campo es obligatorio",
                })}
                error={!!errors.email}
                helperText = {errors.email?.message} 
            />

            <InputLabel>
                Contraseña*:
            </InputLabel> 
            <TextField 
                variant="outlined" 
                size="small"
                fullWidth
                margin="normal"
                type="password"
                {...register("password",{
                    required: "Este campo es obligatorio",
                })}
                error={!!errors.password}
                helperText = {errors.password?.message} 
            />

            <InputLabel>
                Confirmar contraseña*:
            </InputLabel> 
            <TextField 
                variant="outlined" 
                size="small"
                fullWidth
                margin="normal"
                type="password"
                {...register("repeated_password",{
                    required: "Este campo es obligatorio",
                })}
                error={!!errors.repeated_password}
                helperText = {errors.repeated_password?.message} 
            />


            <Button 
                variant="contained" 
                type="submit"
                sx={{marginBlock:"10px"}}
            >
                Crear cuenta
            </Button>


            <Typography>
            Ya tienes una cuenta
            <Link 
                to="/auth/login" 
                style={{ marginLeft:"4px", color:"#214D90"}}>
                Iniciar sesion
            </Link>
            </Typography>

        </form>
    </AuthLayout>
  )
}
