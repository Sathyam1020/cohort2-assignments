import React, { useEffect, useState } from 'react'
import axios  from 'axios';
import Business from './Business';

const App = () => {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/card/get-card');
        setCards(response.data.card);
        console.log(response.data.card);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=''>
      {
        cards.map((card) => {
          return (
            <Business key={card._id} title={card.title} description={card.description} interests={card.interests} twitter={card.twitter} insta={card.instagram}/>
          )
        })
      }
    </div>
  )
}
export default App; 
