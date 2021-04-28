import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import backendService from '../services/backend.service';
import config from '../constants/config';
import BoardCard from '../components/board-card.component';
import { HOME } from '../constants/page-titles';
import * as ROUTES from '../constants/routes';

export default function Home() {
    const history = useHistory();

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        document.title = HOME;
        backendService.get(config.api.boards).then(userBoards => setBoards(userBoards));
    }, []);

    return (
        <div className="container p-8">
            <div>
                <button
                    type="button"
                    title="Add new board"
                    aria-label="Add new board"
                    onClick={() => history.push(ROUTES.CREATE_BOARD)}
                    className="bg-blue-medium text-white rounded h-8 font-bold w-max px-4">
                    <span className="fa fa-plus mr-2" />
                    Add New Board
                </button>
            </div>
            <div className="mt-4 mb-2 font-bold">My boards:</div>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-4">
                {boards.map(board => (
                    <div key={board.id}>
                        <BoardCard data={board} />
                    </div>
                ))}
            </div>
        </div>
    );
}
