import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";
import { useCallback, useEffect } from "react";
import { JWTDecoder, validateJwtSession } from "../../utils";

export const AuthRoutes = () => {
  const navigate = useNavigate();

  const verifyUserLogged = useCallback(async () => {
    const isUserLogged = await validateJwtSession.existUserLogged();

    if (isUserLogged) {
      const { email } = JWTDecoder.decodeSavedToken();
      if (email.length > 0) {
        navigate("/surveillance");
      }
    }
  }, [navigate]);

  useEffect(() => {
    verifyUserLogged();
  }, [verifyUserLogged]);

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
};
