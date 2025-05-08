import { useEffect, useState } from 'react'
import './pageStyles/common_styles.css'
import './pageStyles/playerpage.css'
import { getPlayers } from '../services/players_service'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    
      try {
          const data = await getPlayers();
          setPlayerData(data);
      } catch (error) {
          console.error('Error fetching players data:', error);
      } finally {
          setIsLoading(false);
      }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleSportClick = (sportName: string) => {
    const playerUrl = `/players/player_profile/${sportName.toLowerCase()}`;
    console.log("Navigating to:", playerUrl);
    navigate(playerUrl);
};

  return (
    <>
        <div className='page_container'>
            <h1 className='header1'>Players</h1>

            <div className='sports_container'>
                {isLoading ? (
                    <p>Loading players...</p>
                ) : (
                    playerData && playerData.map((player) => (
                        <button 
                            key={player.player_id}
                            className='sport_button'
                            onClick={() => handleSportClick(`${player.first_name}-${player.last_name}`)}
                        >
                            {`${player.first_name} ${player.last_name}`}
                        </button>
                    ))
                )}
            </div>
        </div>
    </>
  )
}

export default Player
