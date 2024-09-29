import { useState } from 'react'

const TaskCard = ({ task, updateTask }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const points = task.points || 0
    const updatePoints = (direction) => {
        const fib = [0, 1, 2, 3, 5, 8, 13]
        const index = fib.indexOf(points)
        const nextIndex = direction === 'up' ? index + 1 : index - 1
        const newPoints = fib[nextIndex]
        if (newPoints) {
            updateTask({ ...task, points: newPoints })
        }
    }
    return <div
        draggable
        onDragStart={(e) => {
            e.dataTransfer.setData("id", task.id)
        }}
        className="border rounded p-1 m-1"
    >
        <div className="text-base font-base py-2">
            {isEditingTitle ? (
                <input
                    autoFocus
                    onBlur={() => setIsEditingTitle(false)}
                    value={task.title}
                    onChange={(e) => updateTask({ ...task, title: e.target.value })}
                />
            ) : (
                <div onClick={() => setIsEditingTitle(true)}>
                    {task.title}
                </div>
            )}
        </div>
        <div className="d-flex gap-2 justify-content-between py-2">
            <div className="d-flex gap-2">
                <div>{task.id}</div>
                {task.priority === 'high' && 'high'}
                {task.priority === 'medium' && 'medium'}
                {task.priority === 'low' && 'low'}
            </div>
            <div className="d-flex gap-2 items-center">
                <button onClick={() => updatePoints('down')}>-</button>
                <div className="font-bold">{points}</div>
                <button onClick={() => updatePoints('up')}>+</button>
            </div>
        </div>
    </div>
}

export default TaskCard;
