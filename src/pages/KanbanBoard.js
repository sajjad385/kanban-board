import React, {useEffect, useState} from 'react';
import axios from "axios";

const KanbanBoard = () => {
    const [state, setState] = useState({tasks: []});
    const [addTask, setAddTask] = useState('')
    
    async function fetchData() {
        let response = await axios
        .get('http://127.0.0.1:8000/api/tasks')
        .then(res => {
            return res;
        });
        let tasks = await response.data.data;
        setState({tasks});
    }
    
    useEffect(() => {
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
                await axios.put('http://127.0.0.1:8000/api/tasks/'+task.id, {
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
        let response = await  axios.post('http://127.0.0.1:8000/api/tasks', {
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
            <div className='card mb-2 bg-secondary text-warning fw-bold'>
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
        <>
            {}
            <div className="container-drag">
                <h2 className="header text-center">Kanban Board</h2>
                <div className="row mb-3">
                    <div className="offset-3 col-5">
                        <input type="text" value={addTask} className="form-control" placeholder='Write Your Task'
                               onChange={handleChange}/>
                    </div>
                    <div className="col-2">
                        <button onClick={handleClick} className='btn btn-success'>Add</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <span className="img-thumbnail task-header card-title text-center fw-bold">TO-DO</span>
                            <div className="to_do card-body"
                                 onDragOver={(e) => onDragOver(e)}
                                 onDrop={(e) => {
                                     onDrop(e, "to_do")
                                 }}>
                                {tasks.to_do}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <span className="img-thumbnail card-title text-center fw-bold">Progress</span>
                            <div className="droppable card-body"
                                 onDragOver={(e) => onDragOver(e)}
                                 onDrop={(e) => onDrop(e, "progress")}>
                                {tasks.progress}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <span className="img-thumbnail task-header card-title text-center fw-bold">DONE</span>
                            <div className="droppable card-body"
                                 onDragOver={(e) => onDragOver(e)}
                                 onDrop={(e) => onDrop(e, "done")}>
                                {tasks.done}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default KanbanBoard