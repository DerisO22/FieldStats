import { useEffect, useState } from 'react'
import './pageStyles/common_styles.css'
import './pageStyles/playerpage.css'

interface Player {
  player_id: number,
  first_name: string,
  last_name: string,
  date_of_birth: string,
  gender_id: number,
  bio: string
}

const Player = () => {
  const [ playerData, setPlayerData ] = useState<Player[] | null>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const fetchData = () => {
    try {
      fetch('http://localhost:3001/player_data')
        .then((res) => res.json())
        .then((data) => {
          setPlayerData(data);
          setIsLoading(false);
        })
    } catch (error) {
      console.error('Error fetching sports data:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className='page_container'>
          <h1 className='header1'>Players</h1>
      </div>
    </>
  )
}

export default Player
