import { useState, useEffect } from 'react'
import './pageStyles/sportspage.css'
import './pageStyles/common_styles.css'

interface Sport {
  SportID: number,
  SportName: string,
  Description: string,
  GenderID: number,
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
            <h1 className='header1'>Sports Page</h1>
            <table>
              <thead>
                <tr>
                  <th>Sport Name</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
              {!isLoading && sportsData.map((sport) => (
                <tr key={sport.SportID}>
                  <td>{sport.SportName}</td>
                  <td>{sport.Description}</td>
                </tr>
              ))}
              </tbody>
            </table>
        </div>
      </>
  )
}

export default SportsPage;