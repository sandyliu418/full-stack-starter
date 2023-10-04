import { Helmet } from 'react-helmet-async';
import { useStaticContext } from './StaticContext';

import  Item  from './Item'
import { useEffect, useState } from 'react';

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    const token = 'patmGL23WnOFhPE6L.bceecd89f7267b2c0b9ef548206bf444c973b1ac0c66babf951c5d40b9b8a557';
    const url = 'https://api.airtable.com/v0/appxlyRNEkCsi29zT/Cats';
    fetch(url, {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const staticContext = useStaticContext();
  return (
    <>
      <Helmet>
        <title>Home - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet> {/* to write a comment using javascript use {} before your javascript 
      command */}
      <main className="container">
        <h1>Home</h1>

        <div className="row">
          <div className="col-9">{data?.records.map((record) => <Item key={record.id} id={record.id} title={record.fields.Breed} />)}</div>
          <div className="col-3">3 col</div>
        </div>

        {data?.records.map((record) => <Item key={record.id} id={record.id} title={record.fields.Breed} />)}
        {/* <p>This is where it starts.</p>
        <Item title = "title1"></Item>
        <Item title = "title2"></Item>
        <Item title = "title3"></Item>
        <Item title = "title4"></Item> */}
      </main>
    </>
  );
}

export default Home;
