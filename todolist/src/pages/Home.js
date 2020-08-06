import React, { useState, useEffect, useContext } from 'react';
import { todoContext } from '../App';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Input from '../components/Input';
import List from '../components/List';
import Button from '../components/Button';

const Home = () => {

    const history = useHistory();
    const {todoList, setTodoList} = useContext(todoContext);
    
    const [active, setActive] = useState('today');
    const [query, setQuery] = useState('');
    const [columns] = useState(['Title', 'Priority', 'Due Date', 'Action']);
    const [data, setData] = useState([]);
    const [secondaryData, setSecondaryData] = useState(data);

    const onClickHandler = () => {
        // history.push('/add');
    }

    const handleSearch = (e) => {
        setQuery(e.target.value);
    }

    // const iterateTodo = (row) => {
    //     let tempTodo = [...todoList]
    //     let tempData = [...data]
    //     let index;
    //     let completedTodo;
    //     tempData.forEach((todo, index) => {
    //         if(todo.title === row.title && todo.priority === row.priority && todo.dueDate === row.dueDate) {
    //             todo.completed = true;
    //             index = index;
    //             completedTodo = todo;
    //             return;
    //         }
    //     })
    //     tempTodo[index] = completedTodo;
    //     return tempTodo;
    // }

    const handleCompleted  = (row) => {
        let tempTodo = [...todoList]
        let tempData = [...data]
        let index;
        let completedTodo;
        tempData.forEach((todo, index) => {
            if(todo.title === row.title && todo.priority === row.priority && todo.dueDate === row.dueDate) {
                todo.completed = true;
                index = index;
                completedTodo = todo;
                return;
            }
        })
        tempTodo[index] = completedTodo;
        setTodoList(tempTodo);
    }

    const handleDelete = (row) => {
        let tempTodo = [...todoList];
        tempTodo = tempTodo.filter(todo => {
            console.log(todo.title !== row.title || todo.priority !== row.priority || todo.dueDate !== row.dueDate)
            return (todo.title !== row.title || todo.priority !== row.priority || todo.dueDate !== row.dueDate)
        })

        // or
        // tempTodo.forEach((todo, index) => {
        //     if(todo.title === row.title && todo.priority === row.priority && todo.dueDate === row.dueDate) {
        //         tempTodo.splice(index, 1);
        //         return;
        //     }
        // })
        setTodoList(tempTodo);
    }

    useEffect(() => {
        let tempData = [];
        let today = new Date(),
        date = today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1) + '-' + today.getDate();
        
        todoList.forEach(todo => {
            if(todo.dueDate === date && active === 'today' && !todo.completed) tempData.push(todo);
            else if(active === 'completed' && todo.completed) tempData.push(todo);
            else if(active === 'upcoming' && !todo.completed) tempData.push(todo);
        })

        setData(tempData);
        setQuery('');
    }, [active, todoList])

    useEffect(() => {
        setSecondaryData(data);
    }, [data])

    useEffect(() => {
        if(query.length > 0) {
            let tempData = [...data];
            let searchedData = tempData.filter(todo => {
                return todo.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
            })
            setSecondaryData(searchedData);
        } else {
            setSecondaryData(data);
        }
    }, [query])
    
    return (
        <>
            <Sidebar active={ active } setActive={ setActive } />

            <div className="content">

                <div className="wrapper">
                    <Input placeholder="Search" value={ query } setValue={ handleSearch } />
                </div>

                <List columns={ columns } data={ secondaryData } completed={ active === 'completed' ? true : false } action1={ handleCompleted } action2={ handleDelete } />

                <Button text="Add" onClickHandler={ onClickHandler } />

            </div>
        </>
    )
}

export default Home
