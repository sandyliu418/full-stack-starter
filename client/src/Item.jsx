import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';


function Item({ id, title, ImageURL }) {
  const { user } = useAuthContext();
  return (
    <div className="card mb-3">
      <a href={`/detail/${id}`}>
        <img src={ImageURL} alt="cat" />
      </a>
      {/* <img src={image[0].url} alt="logo" /> */}
      {/* <div className="catName">{title}</div> */}
      <div className="catName">
        <a href={`/detail/${id}`}>{title}</a>
      </div>
      {/* <Link to={`/detail/${id}`}>Link</Link> */}
      {user && <Link to={`/cats/${id}/edit`}>Edit</Link>}
    </div>
  );
}

export default Item; //connects to the files that use the function Item
