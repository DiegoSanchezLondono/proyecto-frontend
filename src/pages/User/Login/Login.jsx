
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { InputText } from '../../../common/InputText/InputText';
import { postLogin } from '../../../services/apiCalls';
import { Decoder } from '../../../services/utiles';

//RDX imports......
import { useSelector, useDispatch } from "react-redux";
import { userData, login } from '../userSlice';

import './Login.css';
import '../../../common/InputText/InputText.css';

export const Login = () => {

    //Instancia de métodos de Redux
    const dispatch = useDispatch();

    const datosReduxUsuario = useSelector(userData);

    //Hooks
    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    })

    //Variables y constantes
    const navigate = useNavigate();

    //Handlers
    const InputHandler = (e) => {
        
        //Bindear (atar)
        setCredenciales((prevState)=>({...prevState, 
            [e.target.name] : e.target.value
            
        }));;
    }

    //Funciones
    const Logeame = () => {
       

        //Desde aqui llamamos al servicio....
        postLogin(credenciales) //se trae el token del back 
            .then(
                resultado => {
                    console.log(resultado, 'aaaaa');

                    //Ahora yo decodificaría el token... 

                    //Una vez decodificado, guardaría los datos de usuario y el token,
                    //ambas cosas en REDUX, para usarlas cuando yo quiera

                    let decodificado = Decoder(resultado.data.token);
                    console.log(resultado);

                    let userPass = {
                        token : resultado, // estos datos serian el payload //
                        user: decodificado.usuario[0]

                    }

                    //Finalmente, guardo en RDX....

                    //Guardo mediante la ACCIÓN login, los datos del token y del token decodificado (datos de usuario)
                    dispatch(login({userPass: userPass}));


                    //Finalmente, navego y te llevo a home en casi un segundo de delay
                    setTimeout(()=>{
                        navigate("/")
                    },750);
                }
            )
            .catch(error => console.log(error));
    }

    useEffect(()=>{
        if(datosReduxUsuario.userPass.token !== ''){
            navigate("/");
        }
    },[])

    return (
        <div className='loginDesign'>
            {/* <pre>{JSON.stringify(credenciales, null, 2)}</pre> */}
            Email
            <InputText 
                type={"email"} 
                name={"email"} 
                placeholder={"Escribe tu email"} 
                functionHandler={InputHandler}
            />
            Password
            <InputText 
                type={"password"}  
                name={"password"} 
                placeholder={"Escribe tu contraseña"} 
                functionHandler={InputHandler}
            />

            <div className='loginButtonDesign' onClick={()=>Logeame()}>LOGIN</div>
        </div>
    );
};