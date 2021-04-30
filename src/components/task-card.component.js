import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SocketContext } from '../context/socket.context';
import backendService from '../services/backend.service';
import * as ROUTES from '../constants/routes';
import config from '../constants/config';

export default function TaskCard(props) {
    const { data, boardId, provided, snapshot } = props;
    const socket = useContext(SocketContext);

    async function handleDeleteTask() {
        try {
            await backendService.del(`${config.api.tasks}/${data.id}`);
            await socket.emit(config.socket.delete, {
                boardId,
                taskId: data.id
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div
            className="border-blue-medium border-2 h-12 items-center flex justify-between p-2"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.5 : 1 }}>
            <Link to={ROUTES.TASK.replace(':taskId', data.id).replace(':boardId', boardId)}>
                <h1>{data.title}</h1>
            </Link>
            <button
                type="button"
                title="Delete task"
                aria-label="Delete task"
                className="bg-red-primary p-1 rounded"
                onClick={handleDeleteTask}>
                <span className="fa fa-trash text-white" />
            </button>
        </div>
    );
}
