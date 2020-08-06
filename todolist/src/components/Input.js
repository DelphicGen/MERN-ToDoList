import React from 'react';

const Input = ({ placeholder, value, setValue, type, name }) => {
    return (
        <div className="after-container">
          <input className='input-bar' placeholder={ placeholder } name={name && name} type={type ? type : 'text'} value={ value } onChange={setValue} />
          <div className="input-bar-after" />
        </div>
    )
}

export default Input
