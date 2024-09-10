import axios from 'axios';

const api_url = 'http://localhost:3000/api/usuarios';

export const getUsuarios = async() => {
  try{
    const response = await axios.get(api_url);
    return response.data;
  }catch(error){
    console.error("Error al obtener datos", error);
    throw error;
  }
}

export const deleteUsuario = async (id) => {
  try{
    const response = await axios.delete(`${api_url}/${id}`);
    return response.data;
  }catch(error){
    console.error("Error al obtener datos", error);
    throw error;
  }
}

//Añadir nuevo usuario
export const addUsuario = async (data) => {
  try{
    const response = await axios.post(api_url, data);
    return response.data;
  }catch(error){  
    console.error("Error al obtener datos", error);
  }
}