import { useEffect } from 'react';
import { NOT_FOUND } from '../constants/page-titles';

export default function NotFound() {
    useEffect(() => {
        document.title = NOT_FOUND;
    }, []);
    return <p>Page not found</p>;
}
