import React, { useEffect, useRef } from 'react';

const Input2 = ({ min, max, value, setValue, name }) => {

    const ref = useRef(null);

    useEffect(() => {
        let scale = ref.current.offsetWidth / 100;
        let position = -2.5/100;
        document.getElementsByClassName("range-span")[0].style.transform = `translate(calc(${value*scale}px), 0)`;
        document.getElementsByClassName("range-value")[0].style.left = `${value*position}%`;
    }, [value])

    return (
        <div className="range-container">
            <div className="range-value"><span className="range-span">{ value }</span></div>
            <input ref={ref} className='range-input'name={name && name} min={min} max={max} type='range' value={ value } onChange={setValue} />
        </div>
    )
}

export default Input2
