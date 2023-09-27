import { Link } from 'react-router-dom';

function Item({ title }) {
    return <div className = "card mb-3">
        {title} <Link to = "/detail">Link</Link>
        </div>;
}

export default Item; //connects to the files that use the function Item
