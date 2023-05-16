export const isValidEmail = (email: string): boolean => {
  
    const match = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
  
      return !!match;
  };
  
  export const isValidNameOrLastName = (text: string): boolean => {
  
    const match = String(text)
        .toLowerCase()
        .match(
          /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+\s{0,1}[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+$/ 
        );
  
      return !!match;
  };


  export const isEmail = (email: string): string | undefined => {
    return isValidEmail(email) 
      ? undefined
      : 'El texto ingresado no tiene el formato de un correo electrónico.';
  }

  export const isNameOrLastName = (text: string): string | undefined => {
    return isValidNameOrLastName(text) 
      ? undefined
      : 'Los numero y caracteres especiales no estan permitidos en este campo.';
  }
