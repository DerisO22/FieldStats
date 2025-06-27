import { useState, useEffect } from 'react'
import './pageStyles/sportspage.css'
import './pageStyles/common_styles.css'
import { useNavigate } from 'react-router-dom'
import { getSports, getSportGenders, deleteSport, addSport } from '../services/sports_service'
import { useModal } from '../contexts/ModalContext'
import AddSport from '../components/component_operations/AddSport'
import { useAuth } from '../contexts/AuthContext'
import { Sport, SportGenders } from '../types/sports_types'

interface SportPageProps {
    searchTerm: string
}

const SportsPage = ({ searchTerm }: SportPageProps) => {
    const [ sportsData, setSportsData ] = useState<Sport[]>([]);
    const [ sportGenderData, setSportGenderData ] = useState<SportGenders[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { isAuthenticated, isAdmin } = useAuth();

    const fetchData = async () => {
        setIsLoading(true);
    
        try {
            const data = await getSports();
            const genderData = await getSportGenders();
            setSportGenderData(genderData);
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

    const getUniqueGenders = () => {
        const genderMap = new Map();
        sportGenderData.forEach(sg => {
            if (!genderMap.has(sg.gender_id)) {
                genderMap.set(sg.gender_id, {
                    gender_id: sg.gender_id,
                    gender: sg.gender
                });
            }
        });
        return Array.from(genderMap.values());
    };

    const getSportsByGender = (genderId: number) => {
        const sportIdsForGender = sportGenderData
            .filter(sg => sg.gender_id === genderId)
            .map(sg => sg.sport_id);
        
        return sportsData.filter(sport => 
            sportIdsForGender.includes(sport.sport_id) &&
            sport.sport_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div className='page_container'>
            <h1 className='header1'>Sports</h1>

            <div className='sports_container'>
                {isLoading ? (
                    <p>Loading sports...</p>
                ) : (
                    <>
                        {getUniqueGenders().map((gender) => {
                            const sportsForGender = getSportsByGender(gender.gender_id);
                            
                            // Only render the section if there are sports for this gender
                            if (sportsForGender.length === 0) return null;
                            
                            return (
                                <div key={gender.gender_id} className='gender_section'>
                                    <h2 className='gender_header2'>{gender.gender_id === 7 ? "Male" : (gender.gender_id === 8 ? "Female" : "Other")}</h2>
                                    <div className='sports_grid'>
                                        {sportsForGender.map((sport) => (
                                            <div key={sport.sport_id}>
                                                <button 
                                                    className='sport_button'
                                                    onClick={() => handleSportClick(sport.sport_name)}
                                                >
                                                    <img 
                                                        className='button_icon' 
                                                        src={`/sports_logos/${sport.sport_name.replace(/\s/g, '').toLowerCase()}.png`} 
                                                        alt={sport.sport_name} 
                                                    />
                                                    {sport.sport_name}

                                                    {isAuthenticated && isAdmin && (
                                                        <div 
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevent triggering sport click
                                                                handleDelete(sport.sport_name);
                                                            }} 
                                                            className='delete_button'
                                                        >
                                                            Delete
                                                        </div>
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
            {isAuthenticated && isAdmin && (
                <button onClick={openAddSportModal} className='add_sport_button'>Add Sport</button>
            )}
        </div>
    )
}

export default SportsPage;