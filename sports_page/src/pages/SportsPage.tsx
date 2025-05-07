import { useState, useEffect } from 'react'
import './pageStyles/sportspage.css'
import './pageStyles/common_styles.css'

interface Sport {
  sport_id: number,
  sport_name: string,
  sport_description: string,
  has_gender_division: boolean,
}

const SportsPage = () => {
  const [ sportsData, setSportsData ] = useState<Sport[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const fetchData = () => {
    setIsLoading(true);

    fetch("http://localhost:3001/sports_data") 
      .then((res) => res.json())
      .then((data) => {
        setSportsData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching sports data:', err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(sportsData);

  return (
      <>
        <div className='page_container'>
            <h1 className='header1'>Sports</h1>

            <div className='sports_container'>
              {!isLoading && sportsData.map((sport) => (
                <button className='sport_button'>{sport.sport_name}</button>
              ))}
            </div>
        </div>
      </>
  )
}

export default SportsPage;