
import React from 'react';

export const InputText = ({type, name, className, placeholder, functionHandler, errorHandler}) => {

    return (
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={(e)=>functionHandler(e)}
            onBlur={(e)=>errorHandler(e)}
            className={className}
        />
    )
}