import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router';
import config from '../constants/config';
import TASK_STATUSES from '../constants/task-statuses';
import backendService from '../services/backend.service';
import BoardColumn from './board-column.component';
import * as ROUTES from '../constants/routes';

export default function KanbanBoard(props) {
    const history = useHistory();

    const { boardId } = props;

    const [tasks, setTasks] = useState([]);

    useEffect(async () => {
        const boardData = await backendService.get(`${config.api.boards}/${boardId}`);
        setTasks(boardData.tasks);
    }, []);

    async function handleDeleteTask(taskId) {
        try {
            await backendService.del(`${config.api.tasks}/${taskId}`);
            const notDeleted = tasks.filter(task => task.id !== taskId);
            setTasks(notDeleted);
        } catch (err) {
            console.error(err);
        }
    }

    async function onDragEnd(result) {
        try {
            const taskId = result.draggableId;
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            const newStatus = result.destination.droppableId;
            const tasksCopy = [...tasks];
            await backendService.put(`${config.api.tasks}/${taskId}`, { status: newStatus });
            tasksCopy[taskIndex].status = newStatus;
            setTasks(tasksCopy);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleDeleteBoard() {
        try {
            await backendService.del(`${config.api.boards}/${boardId}`);
            history.push(ROUTES.HOME);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-2 mt-4">
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    {Object.keys(TASK_STATUSES).map(key => {
                        const taskStatus = TASK_STATUSES[key];
                        return (
                            <Droppable droppableId={taskStatus.key} key={taskStatus.key}>
                                {(provided, snapshot) => (
                                    <BoardColumn
                                        provided={provided}
                                        snapshot={snapshot}
                                        status={taskStatus}
                                        boardId={boardId}
                                        deleteTaskHandler={handleDeleteTask}
                                        tasks={tasks.filter(task => task.status === taskStatus.key)}
                                    />
                                )}
                            </Droppable>
                        );
                    })}
                </DragDropContext>
            </div>
            <div className="flex flex-row justify-end mt-8 gap-4">
                <button
                    type="button"
                    title="Delete board"
                    aria-label="Delete board"
                    className="bg-red-primary text-white px-4 rounded h-10 flex flex-row justify-between align-items items-center"
                    onClick={handleDeleteBoard}>
                    <span className="fa fa-trash mr-2" />
                    Delete Board
                </button>
                <button
                    type="button"
                    title="Add task"
                    aria-label="Add task"
                    className="bg-blue-medium text-white px-4 rounded h-10"
                    onClick={() =>
                        history.push(
                            ROUTES.TASK.replace(':taskId', 'new').replace(':boardId', boardId)
                        )
                    }>
                    <span className="fa fa-plus mr-2" />
                    Add task
                </button>
            </div>
        </div>
    );
}
