import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item';

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const token = 'patmGL23WnOFhPE6L.bceecd89f7267b2c0b9ef548206bf444c973b1ac0c66babf951c5d40b9b8a557';
    const url = `https://api.airtable.com/v0/appxlyRNEkCsi29zT/Cats/${id}`;
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [id]);

  // var subjects = "fields%5B%5D=Breed&fields%5B%5D=Image";
  // let catEnvironment = data.fields["Environment"]

  return (
    <main className="container">
      <div className="outerWindow">
        <div className="innerWindow">
          <div className="">
            <div className="cardDetail">
              {data && <Item key={data?.id} id={data?.id} title={data?.fields.Breed} image={data?.fields.Image} />}
            </div>
            <div className="LifeExpectancy">
              <h2>
                Life Expectancy: {data?.fields.MinYears} - {data?.fields.MaxYears}
              </h2>
            </div>
            <div className="PreferredEnvironment">
              <h2>Preferred Environment: {data?.fields.Environment}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="outerDoor">
        <div className="topInnerDoor">
          <div className="leftString"></div>
          <div className="rightString"></div>
          <div className="sign">
            <div className="shelter">shelter</div>
          </div>
        </div>
        <div className="lowerInnerDoor"></div>
        <div className="doorKnob">
          <div className="keyholeTop"></div>
          <div className="keyholeBottom"></div>
        </div>
      </div>
    </main>
  );
}

export default Detail;
