import React, {useEffect, useState} from 'react';
import axios from "axios";
import {apiUrl} from "../config/apiConfig";
import Board from "../components/Board";
import AddTask from "../components/AddTask";

const KanbanBoard = () => {
    const [state, setState] = useState({tasks: []});
    const [addTask, setAddTask] = useState('')

    async function fetchData() {
        let response = await axios
            .get(apiUrl + '/tasks')
            .then(res => {
                return res;
            });
        let tasks = await response.data.data;
        setState({tasks});
    }

    useEffect(() => {
        console.log(apiUrl)
        fetchData()
    }, []);


    const onDragStart = (event, id) => {
        event.dataTransfer.setData("id", parseInt(id));
    }

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const onDrop = async (event, category) => {
        let id = event.dataTransfer.getData("id");

        let tasks = state.tasks.filter(async (task) => {
            if (task.id == id) {
                task.status = category;
                await axios.put(apiUrl + '/tasks/' + task.id, {
                    status: task.status
                })
            }
            return task;
        });
        setState({tasks})
    }
    const handleChange = event => {
        setAddTask(event.target.value);
    };

    const handleClick = async event => {
        const tasks = [...state.tasks]
        event.preventDefault();
        let response = await axios.post(apiUrl + '/tasks', {
            id: tasks.length + 1,
            title: addTask,
        })
        tasks.push(response.data.data)
        setState({tasks})
        setAddTask('')

    };


    let tasks = {
        to_do: [],
        progress: [],
        done: []
    }
    state.tasks !== undefined && state.tasks.forEach((task) => {
        tasks[task.status].push(
            <div className='card mb-2 text-bg-light shadow' style={{borderLeft: '5px solid #674edf'}}>
                <div className="card-body">
                    <div key={task.id}
                         onDragStart={(e) => onDragStart(e, task.id)}
                         draggable
                         className="draggable"
                         id={task.id}
                    >
                        {task.title}
                    </div>
                </div>
            </div>
        );
    })
    return (
        <div className='container'>
            <div className="container-drag">
                <h2 className="header text-center m-3">Kanban Board</h2>
                <AddTask addTask={addTask} handleChange={handleChange} handleClick={handleClick}/>
                <Board onDragOver={onDragOver} onDrop={onDrop} tasks={tasks}/>
            </div>
        </div>
    );
}

export default KanbanBoard