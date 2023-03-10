
import React, { useState, useEffect } from 'react';
import './Profile.css';

import { useNavigate } from 'react-router-dom';

//Imports de RDX
//primero importo métodos que me permitirán conectarme para leer y modificar en redux
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { userAlquileres } from '../../../services/apiCalls';

export const Profile = () => {

    //Instancio useNavigate
    const navigate = useNavigate();

    const [alquileres, setAlquileres] = useState([]);
    //Instancio RDX
    const userRDX = useSelector(userData);

    useEffect(()=>{

        if(userRDX.userPass.token === ''){
            navigate("/");
        } else {
            //A este else entraremos si SI que tenemos el token....
            userRDX.userPass
        }
    },[]);



useEffect(() => {
    if (alquileres.length === 0){
        
        setTimeout(()=>{
            
            userAlquileres(userRDX.userPass.token, userRDX.userPass.user._id)
            
           
            .then(
                resultado => {
              
                    setAlquileres(resultado.data)
                  
                }
            )
            .catch(error => console.log(error));
        }, 500);
    }
}, [alquileres]);

    return (
        <div className='profileDesign'>
            <h2>DATOS DE USUARIO</h2>
            <div>
               Nombre:
            </div>
            <div  className='dataDesign'>
               {userRDX.userPass.user.name}
            </div>
            <div>
                Apellidos:
            </div>
            <div className='dataDesign'>
                {userRDX.userPass.user.surname}
            </div>
            <div>
                Email:
            </div>
            <div className='dataDesign'>
                {userRDX.userPass.user.email}
            </div>
            <div>
                Pais:
            </div>
            <div className='dataDesign'>
                {userRDX.userPass.user.country}
            </div>
            <div>
                Nº Tarjeta de Credito/Debito:
            </div>
            <div  className='dataDesign'>
                {userRDX.userPass.user.creditCard}
            </div>
            <div>
                <h2>MIS ALQUILERES</h2>
              
            </div>
            <div className='dataDesign'>
           
            {alquileres.length > 0 &&
               alquileres.map(
              
                    serie => {
                        return (
                            
                            <div key={serie._id}>  
                            
                                <table>     
                                    <tbody>
                                        <tr>
                                            <td> Titulo:
                                                {serie.nameSerie}
                                            </td>
                                            <td> Fecha Inicio de Alquiler:
                                                {serie.fechaInicio}
                                            </td>
                                            <td> Fecha Fin de Alquiler:
                                                {serie.fechaFin}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> 
                            </div>                             
                        )
                    }
                )
                
            }
            </div>
         

        </div>
    )
}