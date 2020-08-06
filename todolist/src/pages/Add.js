import React, { useState, useContext } from 'react';
import { todoContext } from '../App';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Input2 from '../components/Input2';
import Button from '../components/Button';

const Add = () => {

    const history = useHistory();
    const {todoList, setTodoList} = useContext(todoContext);

    const [form, setForm] = useState({
        title: '',
        priority: 0,
        dueDate: '',
        completed: false
    })

    const handleForm = e => {
        let {name, value} = e.target;
        if(name === 'priority') value = parseInt(value, 10);
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))

        // or
        // setForm({
        //     ...form,
        //     [e.target.name]: e.target.value
        // })
    }

    const handleSave = () => {
        let tempTodo = [...todoList]
        tempTodo.push(form);
        setTodoList(tempTodo);
        history.push('/')
    }

    const handleCancel = () => {
        history.push('/');
    }

    return (
        <div className="add-container">

            <div className="add-form">
            
                <Input placeholder="Title" name="title" value={ form.title } setValue={ handleForm } />

                <Input2 name="priority" min="1" max="100" value={ form.priority.toString() } setValue={ handleForm } />

                <Input placeholder="Due Date" type="date" name="dueDate" value={ form.dueDate } setValue={handleForm} />

                <div className="button-container">
                    <Button text="Save" onClickHandler={ handleSave } />
                    <Button text="Cancel" gray={ true } onClickHandler={ handleCancel } />
                </div>

            </div>


        </div>
    )
}

export default Add
