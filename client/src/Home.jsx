import { Helmet } from 'react-helmet-async';
import { useStaticContext } from './StaticContext';

import  Item  from './Item'

function Home() {
  const staticContext = useStaticContext();
  return (
    <>
      <Helmet>
        <title>Home - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet> {/* to write a comment using javascript use {} before your javascript 
      command */}
      <main className="container">
        <h1>Home</h1>
        <p>This is where it starts.</p>
        <Item title = "title1"></Item>
        <Item title = "title2"></Item>
        <Item title = "title3"></Item>
        <Item title = "title4"></Item>
      </main>
    </>
  );
}

export default Home;
