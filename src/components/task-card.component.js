import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function TaskCard(props) {
    const { data, boardId, provided, snapshot, deleteTaskHandler } = props;

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
                onClick={() => deleteTaskHandler(data.id)}>
                <span className="fa fa-trash text-white" />
            </button>
        </div>
    );
}
