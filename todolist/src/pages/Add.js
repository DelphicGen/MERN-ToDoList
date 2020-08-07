import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Input2 from '../components/Input2';
import Button from '../components/Button';
import axios from 'axios';

const Add = () => {

    const history = useHistory();

    const [form, setForm] = useState({
        title: '',
        priority: 0,
        dueDate: ''
    })

    const handleForm = e => {
        let {name, value} = e.target;
        if(name === 'priority') value = parseInt(value, 10);
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }

    const handleSave = () => {
        
        axios({
            method: 'post',
            url: 'http://localhost:9000/api/todolist',
            data: form,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                console.log(JSON.stringify(response));
                setForm(prevForm => ({
                    ...prevForm,
                    title: '',
                    priority: 0,
                    dueDate: ''
                }))
            })
    }

    const handleCancel = () => {
        history.push('/');
    }

    useEffect(() => {
        console.log(form)
    }, [form])

    return (
        <div className="add-container">

            <div className="add-form">
            {/* <form method="POST" action="http://localhost:9000/api/todolist" className="add-form"> */}
            
                <Input placeholder="Title" name="title" value={ form.title } setValue={ handleForm } />

                <Input2 name="priority" min="1" max="100" value={ form.priority.toString() } setValue={ handleForm } />

                <Input placeholder="Due Date" type="date" name="dueDate" value={ form.dueDate } setValue={handleForm} />

                <div className="button-container">
                    <Button text="Save" onClickHandler={ handleSave } />
                    <Button text="Cancel" gray={ true } onClickHandler={ handleCancel } />
                </div>

            {/* </form> */}
            </div>

        </div>
    )
}

export default Add
