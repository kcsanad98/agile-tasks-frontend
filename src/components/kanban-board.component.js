import { useEffect, useReducer, useRef } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router';
import io from 'socket.io-client';
import backendService from '../services/backend.service';
import BoardColumn from './board-column.component';
import config from '../constants/config';
import TASK_STATUSES from '../constants/task-statuses';
import * as ROUTES from '../constants/routes';

function reducer(state, action) {
    switch (action.type) {
        case config.reducerActions.add:
            return { tasks: [...state.tasks, action.newTask] };
        case config.reducerActions.addMany:
            return { tasks: [...state.tasks, ...action.newTasks] };
        case config.reducerActions.remove:
            return { tasks: state.tasks.filter(task => task.id !== action.taskId) };
        case config.reducerActions.update:
            return {
                tasks: state.tasks.map(task =>
                    task.id === action.taskId ? { ...task, ...action.updatedTask } : task
                )
            };
        default:
            return state;
    }
}

export default function KanbanBoard(props) {
    const history = useHistory();
    const socketRef = useRef();

    const { boardId } = props;

    const [state, dispatch] = useReducer(reducer, { tasks: [] });

    function initSocket() {
        const server = `${config.server.protocol}://${config.server.host}:${config.server.port}`;
        socketRef.current = io.connect(server);
        socketRef.current.on(config.server.socketGateway, ({ board, task, newStatus }) => {
            if (board === boardId) {
                dispatch({
                    type: config.reducerActions.update,
                    taskId: task,
                    updatedTask: { status: newStatus }
                });
            }
        });
    }

    useEffect(async () => {
        const boardData = await backendService.get(`${config.api.boards}/${boardId}`);
        dispatch({ type: config.reducerActions.addMany, newTasks: boardData.tasks });
        initSocket();
        return () => socketRef.current.disconnect();
    }, []);

    async function handleDeleteTask(taskId) {
        try {
            await backendService.del(`${config.api.tasks}/${taskId}`);
            dispatch({ type: config.reducerActions.remove, taskId });
        } catch (err) {
            console.error(err);
        }
    }

    async function onDragEnd(result) {
        try {
            const taskId = result.draggableId;
            const newStatus = result.destination.droppableId;
            await backendService.put(`${config.api.tasks}/${taskId}`, { status: newStatus });
            dispatch({
                type: config.reducerActions.update,
                taskId,
                updatedTask: { status: newStatus }
            });
            await socketRef.current.emit(config.server.socketGateway, {
                board: boardId,
                task: taskId,
                newStatus
            });
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
                                        tasks={state.tasks.filter(
                                            task => task.status === taskStatus.key
                                        )}
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
