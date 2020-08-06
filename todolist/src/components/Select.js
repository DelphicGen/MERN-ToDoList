import React from 'react';

const Select = ({ options, select, setSelect }) => {
    return (
        <div className="after-container">
            <select placeholder="Sort by" className="select" value={ select } onChange={(e) => setSelect(e.target.value)}>
                {
                    options.map((option, index) => {
                        return (
                            index === 0 ?
                            <option key={ option } value="">{option}</option> :
                            <option key={ option } value={ option.toLowerCase() }>{option}</option>
                        )
                    })
                }
            </select>
            <div className="select-after"></div>
        </div>
    )
}

export default Select
