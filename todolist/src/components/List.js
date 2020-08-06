import React, { useState, useEffect } from 'react';
import Button from './Button';

const List = ({ columns, data, completed, action1, action2 }) => {

    const [showArrow, setShowArrow] = useState(false);
    const [sorting, setSorting] = useState('ascending');
    const [sortedColumn, setSortedColumn] = useState('');

    const camelize = (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    const sortingHandler = (column) => {
        let tempColumn = camelize(column);
        let tempSorting = sorting;

        tempColumn = tempColumn === 'duedate' ? 'dueDate' : tempColumn;

        if(sortedColumn === column) {
            // sorting === 'ascending' ? (setSorting('descending')) : setSorting('ascending');
            if(sorting === 'ascending') {
                setSorting('descending');
                tempSorting = 'descending';
            } else {
                setSorting('ascending');
                tempSorting = 'ascending';
            }
        } else {
            setSorting('ascending');
            tempSorting = 'ascending';
        }

        data.sort((a, b) => {
            if (a[tempColumn] < b[tempColumn]) {
                return tempSorting === 'ascending' ? -1 : 1;
            }
            if (a[tempColumn] > b[tempColumn]) {
                return tempSorting === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setShowArrow(true);
        setSortedColumn(column);
        setTimeout(() => {
            setShowArrow(false);
        }, 1000);
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {
                            columns.map(column => {
                                return (
                                    <th key={ column }>
                                        <span className="column" onClick={() => sortingHandler(column)}>{ column }
                                            <span className={`${column.toLowerCase()} ${showArrow && sortedColumn === column && 'show-arrow'} ${sorting === 'descending' && 'spin-arrow'}`}>&uarr;</span>
                                        </span>
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, index) => {
                            return (
                                <tr key={ index }>
                                    <td>{ row.title }</td>
                                    <td>{ row.priority }</td>
                                    <td>{ row.dueDate }</td>
                                    <td>
                                        <div className={`${completed === false && 'button-container'}`}>
                                            {
                                                completed === false && 
                                                <Button text="Complete" onClickHandler={ () => action1(row) } />
                                            }
                                            <Button text="Delete" gray={ true } onClickHandler={ () => action2(row) } />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default List
