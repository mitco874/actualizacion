import { useForm } from "react-hook-form";
import { Button, TextField, InputLabel, Typography, Divider, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom"
import { sistemaDeteccionApi } from "../../../api";

import { localStorageManager } from "../../../utils"; 
import { validations } from "../../../utils";

import { useState } from "react";
import { AuthLayout } from "../../layout";


interface LoginFormData {
  email: string;
  password: string;
}

interface LoginState {
  hasError: boolean,
  message: string
} 

const initialLoginFormState: LoginFormData = {
  email: "",
  password: ""
}

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }  } = useForm<LoginFormData>({ defaultValues: initialLoginFormState })
  const [loginState, setLoginState] = useState<LoginState>({ hasError: false, message: ""})
  const navigate = useNavigate();

  const onLoginSubmit = async (loginFormData: LoginFormData) => {
    try {
      const {data} = await sistemaDeteccionApi.post("auth/login", loginFormData )
      localStorageManager.saveToken(data.data.access_token)

      setTimeout(() => {
        goToDashboard()
      }, 500);

    } catch (error: any) {

      setLoginState({message: error.response.data.message, hasError: true});

      setTimeout(() => {
        setLoginState({...loginState, hasError: false});
      }, 2000);

    }
  }

  const goToDashboard = () => {
    navigate("/surveillance")
  }


  return (
    <AuthLayout>
      { loginState.hasError && (<Alert severity="error">{loginState.message}</Alert>) }
            
            <form onSubmit={handleSubmit(onLoginSubmit)} style={{display: "flex", flexDirection: "column"}}>
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

              <Button 
                variant="contained" 
                type="submit"
                sx={{marginBlock:"10px"}}
              >Iniciar sesion</Button>

                <Divider > <Typography> También puedes: </Typography>  </Divider>
              
              <Button 
                variant="outlined"
                sx={{marginBlock:"10px"}}
                onClick={goToDashboard}
              >
                Ingresar sin cuenta
              </Button>

              <Typography>
                Todavia no tienes cuenta? 
                <Link 
                  to="/auth/register" 
                  style={{ marginLeft:"4px", color:"#214D90"}}>
                  Crear cuenta
                </Link>
              </Typography>

            </form>
    </AuthLayout>
  )
}
