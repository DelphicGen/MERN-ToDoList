import React from 'react';

const Button = ({ text, onClickHandler, gray }) => {
    return (
        <button className={`button ${gray && 'gray'}`} onClick={onClickHandler}>
            { text }
        </button>
    )
}

export default Button
