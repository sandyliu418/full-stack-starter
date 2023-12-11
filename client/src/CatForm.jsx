import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhotoInput from "./Components/PhotoInput";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CatForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        Breed: '',
        MinYears: '',
        MaxYears: '',
        Image: ''
    });
    const [isConfirmDeleteShowing, setConfirmDeleteShowing] = useState(false);

    useEffect(() => {
        if (id) {
            fetch(`/api/cats/${id}`)
             .then((response) => response.json())
             .then((json) => setData(json));
        }
    }, [id]);

    function onChange(event) {
        const newData = {...data };
        newData[event.target.name] = event.target.value;
        setData(newData);
    }

    async function onSubmit(event) {
        event.preventDefault();
        try {
            let path = '/api/cats';
            let method = 'POST';
            if (id) {
                path = `/api/cats/${id}`;
                method = 'PATCH';
            }
            const response = await fetch(path, {
                method, 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await response.json()
            console.log(json);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    function showConfirmDeleteModal() {
        setConfirmDeleteShowing(true);
    }

    function handleClose() {
        setConfirmDeleteShowing(false);
    }

    async function onDelete() {
        handleClose();
        try {
            await fetch(`/api/cats/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="container">
        <h1>Cat Form</h1>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="Breed">Breed</label>
                <input type="text" id="Breed" name="Breed" value={data.Breed} 
                    onChange={onChange}
                    className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="MinYears">MinYear</label>
                <input type="text" id="MinYears" name="MinYears" value={data.MinYears ?? ''} 
                onChange={onChange}
                className="form-control" />
            </div>  
            <div>
                <label htmlFor="MaxYears">MaxYear</label>
                <input type="text" id="MaxYears" name="MaxYears" value={data.MaxYears ?? ''} 
                onChange={onChange}
                className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="Image">Image</label>
                <PhotoInput type="Image" name="Image"
                            onChange={onChange}
                            value={data.Image} valueUrl={data.ImageUrl}
                            className="card">
                    <div className="card-body">
                        Click here to drag and drop
                    </div>
                </PhotoInput>
                </div>
                <div classNamme="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {/* <button onClick={showConfirmDeleteModal} type="submit" className="btn btn-danger">Delete</button> */}
                    {id && <button onClick={showConfirmDeleteModal} type="button" className="btn btn-danger">Delete</button>}
                </div>
                <Modal centered show={isConfirmDeleteShowing} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this cat?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                        </Button>
                        <Button variant="danger" onClick={onDelete}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </div>
}

export default CatForm;