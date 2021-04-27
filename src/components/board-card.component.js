import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function BoardCard(props) {
    const { data } = props;
    return (
        <div className="border-blue-medium border-2 h-12 items-center flex justify-center">
            <Link to={ROUTES.BOARD.replace(':boardId', data.id)}>
                <h1>{data.title}</h1>
            </Link>
        </div>
    );
}
