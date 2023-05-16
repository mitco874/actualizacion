import { useCallback, useEffect, useState } from "react";
import { validateJwtSession } from "../../../utils";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SessionButton = () => {
    const [activeSession, setActiveSession] = useState<boolean>(false);
    const navigate = useNavigate();

    const verifySession = useCallback(async () => {
      const isUserLogged = await validateJwtSession.existUserLogged();
      setActiveSession(isUserLogged);
    }, []);

    useEffect(()=>{
        verifySession()
    },[verifySession])

    const closeSession = () => {
        validateJwtSession.removeSession();
        goToLoginPage();
    }

    const goToLoginPage = () => {
        setTimeout(()=>{navigate("/auth/login")},500)
    }

    if(activeSession){
        return (<Button sx={{ backgroundColor: "red" }} variant="contained" onClick={closeSession}> Cerrar sesion </Button>)
    }

    return (<Button sx={{ backgroundColor: "green" }} variant="contained" onClick={goToLoginPage}> Iniciar sesion </Button>);
};
