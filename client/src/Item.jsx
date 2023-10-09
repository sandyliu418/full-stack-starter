import { Link } from 'react-router-dom';

function Item({id, title, image}) {
    return <div className = "card mb-3">
        {/* {personality} */}
        <img src={image[0].url} alt="logo" />
        {/* {console.log(image[0].url)}; */}
        {/* <img src={require(`/PHImage/${image}`)}/> */}
        {title}
        <Link to={`/detail/${id}`}>Link</Link>
        </div>;
}

export default Item; //connects to the files that use the function Item