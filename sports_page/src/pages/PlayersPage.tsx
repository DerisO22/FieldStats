import { useEffect, useState } from 'react'
import './pageStyles/common_styles.css'
import './pageStyles/playerpage.css'
import { getPlayers, deletePlayer, addPlayer } from '../services/players_service'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../contexts/ModalContext'
import { useAuth } from '../contexts/AuthContext'
import AddPlayer from '../components/component_operations/AddPlayer'

interface Player {
    player_id: number,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender_id: number,
    bio: string
}

interface AddNewPlayer {
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender_id: number,
    bio: string
}

interface PlayersPageProps {
    searchTerm: string
}

const Player = ({ searchTerm }: PlayersPageProps) => {
    const [ playerData, setPlayerData ] = useState<Player[] | null>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { isAuthenticated, isAdmin } = useAuth();

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

    const handleDelete = async(player_id: number) => {
        setIsLoading(true);

        try {
            await deletePlayer(player_id);
            fetchData();
            closeModal();
        } catch(error) {
            console.error('Error fetching players data:', error);
        } finally {
            setIsLoading(false);
        }
    }   

    const handleAddPlayer = async(new_player_data: AddNewPlayer) => {
        setIsLoading(true);

        try {
            await addPlayer(new_player_data);
            fetchData();
        } catch(error) {
            console.error('Error fetching players data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const openAddPlayerModal = () => {
        openModal(
            <AddPlayer
                onSubmit={handleAddPlayer}
                isLoading={isLoading}
            />
        ),
        'Add New Player'
    }
 
    const handleSportClick = (player_id: number) => {
        const playerUrl = `/players/player_profile/${player_id}`;
        console.log("Navigating to:", playerUrl);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        navigate(playerUrl);
  };

    return (
        <>
            <div className='page_container'>
                <h1 className='header1'>Players</h1>

                <div className='players_container'>
                    {isLoading ? (
                        <p>Loading players...</p>
                    ) : (
                        <>
                            {/* Male Players */}
                            <p className='category'>Male Players</p>
                            <div className='player_button_container'>
                                {playerData && playerData
                                .filter(player => 
                                    player.gender_id === 28 && 
                                    player.first_name.concat(' ', player.last_name).toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((player) => (
                                    <div 
                                        key={player.player_id}
                                        className='player_button'
                                        onClick={() => handleSportClick(player.player_id)}
                                    >
                                        <img className='player_profile_image' src='/empty_user_image.png'></img>
                                        <div className='player_info_container'>
                                            <div className='player_name'>{`${player.first_name} ${player.last_name}`}</div>
                                            {/* Haven't implemented junction between schools and players so just use DOB */}
                                            <div className='player_school'>{`${player.date_of_birth.substring(0,10)}`}</div>
                                        </div>
                                        {isAuthenticated && isAdmin &&
                                            <div onClick={() => handleDelete(player.player_id)} className='delete_button'>Delete</div>
                                        }
                                    </div>
                                ))}
                            </div>

                            {/* Female Players */}
                            <p className='category'>Female Players</p>
                            <div className='player_button_container'>
                                {playerData && playerData
                                .filter(player => 
                                    player.gender_id !== 28 && 
                                    player.first_name.concat(' ', player.last_name).toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((player) => (
                                    <div 
                                        key={player.player_id}
                                        className='player_button'
                                        onClick={() => handleSportClick(player.player_id)}
                                    >
                                        <img className='player_profile_image' src='/empty_user_image.png'></img>
                                        <div className='player_info_container'>
                                            <div className='player_name'>{`${player.first_name} ${player.last_name}`}</div>
                                            {/* Haven't implemented junction between schools and players so just use DOB */}
                                            <div className='player_school'>{`${player.date_of_birth.substring(0,10)}`}</div>
                                        </div>
                                        {isAuthenticated && isAdmin &&
                                            <div onClick={() => handleDelete(player.player_id)} className='delete_button'>Delete</div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {isAuthenticated && isAdmin && (
                    <button onClick={openAddPlayerModal} className='add_sport_button'>Add Player</button>
                )}
            </div>
        </>
    )
}

export default Player;