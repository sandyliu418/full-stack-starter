import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams;
    const [data, setData] = useState();
    useEffect(() => {
        const token='patmGL23WnOFhPE6L.bceecd89f7267b2c0b9ef548206bf444c973b1ac0c66babf951c5d40b9b8a557';
        const url=`https://api.airtable.com/v0/appxlyRNEkCsi29zT/Cats/${id}`;
        fetch(url, {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [id]);

    return (
        <main className = "container">
            <h1>{data?.fields.Breed}</h1>
        </main>
    );
}

export default Detail;