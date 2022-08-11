import React from "react";

const AddTask = ({addTask, handleChange, handleClick}) => {
    return (
        <div className="row mb-3">
            <div className="offset-3 col-5">
                <input type="text" value={addTask} className="form-control" placeholder='Write Your Task'
                       onChange={handleChange} style={{borderRadius: 0}}/>
            </div>
            <div className="col-2">
                <button onClick={handleClick} className='btn text-bg-dark fw-bold border-0' style={{borderRadius: 0}}>Add Task</button>
            </div>
        </div>
    )
}
export default AddTask