
import axios from 'axios';

const root = 'http://localhost:5500/';


export const postLogin = async (credenciales) => {
    console.log(credenciales);
     return await axios.post(`${root}users/login`, credenciales);

    //Devuelvo un token hardcodeado
    //return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjpbeyJfaWQiOiI2M2I5NWFiM2JkOWU2MDAxYjNmYzlkYmUiLCJuYW1lIjoiTWFyY29zIiwic3VybmFtZSI6IkzDs3BleiIsImRuaSI6IjIzMjc4NjU2TiIsImVtYWlsIjoibWFyY29zbUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRTUnZTYWxRVXBmR3hMT2dhVnNZVlcud095cmk0YkZTZDJRcUVaTzFWN0w0T200cjBjSDcyMiIsInBob25lIjo2OTY3NzY0MjEsIm5hdGlvbmFsaXR5IjoiRXNwYcOxYSIsIl9fdiI6MH1dLCJpYXQiOjE2NzM4NTk1MjgsImV4cCI6MTY3Mzk0NTkyOH0.dTAu9QE_93WMHoRukxUWFo2gwJbCBQb4EjUAqImYtPI';
};

export const postRegister = async (usuario) => {

    //A continuación vemos como se enviaría el body por axios para el registro
    return await axios.post(`${root}users/register`, usuario)
}

export const getSeries = async (serie) => {

    return await axios.get(`${root}series`, serie );

}

//Funcion buscar series
export const getSearch = async (title) => {

    // return await axios.get(`${root}series/title`, criterioBusqueda);
    return await axios.get(`${root}series/title/${title}`);
}

//Funcion de alquilar

export const postnewAlquiler = async (body,token) => {

    let config = {
      
        headers: { Authorization: `Bearer ${token}` }
        
    };
    return await axios.post(`${root}alquileres/newAlquiler`, body, config);
}

export const getAllAlquileres = async (token) => {


    let config = {
         //este sería mi endpoint del backend
        headers: { 
            'Authorization': 'Bearer ' + token
          }
    }
     return await axios.get(`${root}alquileres/Alquileres`,config);
}

export const userAlquileres = async (token, id) => {
    let config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    return await axios.get(`${root}alquileres/userAlquileres/${id}`, config)
}
//Endpoints para Admin

export const getallUsers = async (token) => {

    //Esta sería la forma en la que conectaríamos con la API para traernos todos los users en modo admin
    
    let config = {

        method: 'get', //aqui especifico el protocolo http
        url : `${root}/users`, //este sería mi endpoint del backend de admin que trae todos los users
      
        headers: { 
            'Authorization': 'Bearer ' + token
           
          }
          
    }

    return await axios.get(config);
}