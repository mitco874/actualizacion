import axios from "axios"

export const sistemaDeteccionApi = axios.create({ baseURL: "http://localhost:3000" })