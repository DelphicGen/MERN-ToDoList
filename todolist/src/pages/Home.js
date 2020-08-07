import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Input from '../components/Input';
import List from '../components/List';
import Button from '../components/Button';
import axios from 'axios';

const Home = () => {

    const history = useHistory();
    const [todoList, setTodoList] = useState([]);
    
    const [active, setActive] = useState('today');
    const [query, setQuery] = useState('');
    const [columns] = useState(['Title', 'Priority', 'Due Date', 'Action']);
    const [data, setData] = useState([]);
    const [secondaryData, setSecondaryData] = useState(data);

    const onClickHandler = () => {
        history.push('/add');
    }

    const handleSearch = (e) => {
        setQuery(e.target.value);
    }

    const getData = () => {
        axios.get("http://localhost:9000/api/todolist/")
            .then(response => setTodoList(response.data))
    }

    const handleCompleted  = (row) => {
        let tempTodo = [...todoList]
        tempTodo.forEach((todo, i) => {
            if(todo.title === row.title && todo.priority === row.priority && todo.dueDate === row.dueDate) {
                axios.put(`http://localhost:9000/api/todolist/${row._id}`, {})
                    .then(response => {
                        console.log(JSON.stringify(response));
                        getData();
                    })
            }
        })
    }

    const handleDelete = (row) => {
        axios.delete(`http://localhost:9000/api/todolist/${row._id}`)
            .then(response => {
                console.log(JSON.stringify(response));
                getData();
            })
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        let tempData = [];
        let today = new Date(),
        date = today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1) + '-' + ((today.getDate()) < 10 ? `0${today.getDate()}` : today.getDate());
        todoList.forEach(todo => {

            if(todo.dueDate === date && active === 'today' && !todo.completed) tempData.push(todo);
            else if(active === 'completed' && todo.completed) tempData.push(todo);
            else if(active === 'upcoming' && !todo.completed && todo.dueDate > date) tempData.push(todo);
            else if(active === 'missed' && !todo.completed && todo.dueDate < date) tempData.push(todo);
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
