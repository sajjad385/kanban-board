import React from "react";

const Board = ({onDragOver, onDrop, tasks}) => {
    return (
        <div className="row">
            <div className="col-4">
                <div className="card shadow">
                    <span
                        className="task-header card-title text-center text-bg-dark fw-bold border-0 p-2">TO-DO</span>
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
                <div className="card shadow">
                    <span
                        className="card-title text-center fw-bold text-bg-danger fw-bold border-0 p-2">PROGRESS</span>
                    <div className="droppable card-body"
                         onDragOver={(e) => onDragOver(e)}
                         onDrop={(e) => onDrop(e, "progress")}>
                        {tasks.progress}
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="card shadow">
                    <span
                        className="task-header card-title text-center fw-bold text-bg-primary fw-bold border-0 p-2">DONE</span>
                    <div className="droppable card-body"
                         onDragOver={(e) => onDragOver(e)}
                         onDrop={(e) => onDrop(e, "done")}>
                        {tasks.done}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Board