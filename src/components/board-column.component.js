import { Draggable } from 'react-beautiful-dnd';
import TaskCard from './task-card.component';

export default function BoardColumn(props) {
    const { status, boardId, tasks, provided, snapshot } = props;

    return (
        <div
            className={`p-4 border-2 w-full ${
                snapshot.isDraggingOver ? 'border-blue-dark' : 'border-blue-medium'
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}>
            <h1 className="text-3xl font-bold border-b-2">{status.value}</h1>
            <div className="flex flex-col gap-2 mt-4">
                {tasks?.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                            <TaskCard
                                provided={provided}
                                data={task}
                                boardId={boardId}
                                snapshot={snapshot}
                            />
                        )}
                    </Draggable>
                ))}
            </div>
            {provided.placeholder}
        </div>
    );
}
