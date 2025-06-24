import { useState, useEffect } from 'react'
import './pageStyles/sportspage.css'
import './pageStyles/common_styles.css'
import { useNavigate } from 'react-router-dom'
import { getSports, deleteSport, addSport } from '../services/sports_service'
import { useModal } from '../contexts/ModalContext'
import AddSport from '../components/component_operations/AddSport'
import { useAuth } from '../contexts/AuthContext'
import { Sport } from '../types/sports_types'

interface SportPageProps {
    searchTerm: string
}

const SportsPage = ({ searchTerm }: SportPageProps) => {
    const [ sportsData, setSportsData ] = useState<Sport[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { isAuthenticated, isAdmin } = useAuth();

    const fetchData = async () => {
        setIsLoading(true);
    
        try {
            const data = await getSports();
            setSportsData(data);
        } catch (error) {
            console.error('Error fetching sports data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (sport_name: any) => {
        setIsLoading(true);

        try {
            await deleteSport(sport_name);
            fetchData();
        } catch (error) {
            console.error('Error fetching sports data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddSport = async(newSportData: {
        sport_name: string;
        sport_description: string;
        has_gender_division: boolean;
    }) => {
        setIsLoading(true);

        try {
            await addSport(newSportData);
            console.log('Data after addition: ', newSportData)
            await fetchData();
            closeModal();
        } catch (error) {
            console.error('Error adding sport:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const openAddSportModal = () => {
        openModal(
            <AddSport
                onSubmit={handleAddSport}
                isLoading={isLoading}
            />,
            "Add New Sport"
        )
    }

    const handleSportClick = (sportName: string) => {
        const sportUrl = `/sports/${sportName.toLowerCase()}`;
        console.log("Navigating to:", sportUrl);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        navigate(sportUrl);
    };

    return (
        <div className='page_container'>
            <h1 className='header1'>Sports</h1>

            <div className='sports_container'>
                {isLoading ? (
                    <p>Loading sports...</p>
                ) : (
                    sportsData
                    .filter(sport => sport.sport_name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((sport) => (
                        <button 
                            key={sport.sport_id}
                            className='sport_button'
                            onClick={() => handleSportClick(sport.sport_name)}
                        >
                            <img className='button_icon' src={`/sports_logos/${sport.sport_name.replace(/\s/g, '').toLowerCase()}.png`}></img>
                            {sport.sport_name}

                            {isAuthenticated && isAdmin &&
                                <div onClick={() => handleDelete(sport.sport_name)} className='delete_button'>Delete</div>
                            }
                        </button>
                    ))
                )}
            </div>
            {isAuthenticated && isAdmin && (
                <button onClick={openAddSportModal} className='add_sport_button'>Add Sport</button>
            )}
        </div>
    )
}

export default SportsPage;