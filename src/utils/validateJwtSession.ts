import { sistemaDeteccionApi } from "../api";

export const getHeaders = (): any =>{
    const token = localStorage.getItem("token") || "";
    return {
        headers:{ 
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token},
    }
}

export const existUserLogged = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await sistemaDeteccionApi.get("api/v1/user/validate", getHeaders());
        return true;
      } catch (error) {
        removeSession();
        return false;
      }
    }
  
    return false;
};

export const removeSession = () => {
    localStorage.removeItem("token")
}
  