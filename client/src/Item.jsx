import { Link } from 'react-router-dom';

function Item({id, title }) {
    return <div className = "card mb-3">
        {id}: {title} <Link to={`/detail/${id}`}>Link</Link>
        </div>;
}

export default Item; //connects to the files that use the function Item
