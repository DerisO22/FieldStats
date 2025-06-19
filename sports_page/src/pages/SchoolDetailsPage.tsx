import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getSchoolDetails, editSchool, getSchoolSports } from '../services/schools_services'
import { useModal } from '../contexts/ModalContext';
import { useAuth } from '../contexts/AuthContext';
import EditSchool from '../components/component_operations/EditSchool';

interface School {
    school_id: number,
    school_name: string,
    school_type_id: number,
    state: string,
    city: string,
    address: string,
    website: string,
}

interface School_Sport {
    sport_id: number,
    sport_name: string
}

const SchoolDetails = () => {
    const { school_id } = useParams();
    const [schoolData, setSchoolData] = useState<School | null>(null);
    const [schoolSports, setSchoolSports] = useState<School_Sport[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { isAuthenticated, isAdmin } = useAuth();
  
    const fetchData = async () => {
        try {
            const schoolData = await getSchoolDetails(`${school_id}`);
            const schoolSportData = await getSchoolSports(Number(school_id) || 0);
            setSchoolData(schoolData);
            setSchoolSports(schoolSportData);
        } catch (error) {
            console.log("error: ", error);
            setError("error");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [school_id])

    const handleEditSchool = async (schoolData: School) => {
        setIsLoading(true);

        try {
            const newSchoolData = await editSchool(schoolData);
            setSchoolData(newSchoolData);
            fetchData();
            closeModal();
        } catch (error) {
            console.error("Error editing school: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    const openEditSchoolModal = () => {
        openModal(
            <EditSchool
                currentSchool={schoolData || undefined}
                onSubmit={handleEditSchool}
                isLoading={isLoading}
            />,
            `Edit School ${schoolData?.school_id}`
        )
    }

    if (isLoading) {
        return (
            <div className="page_container">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error || !schoolData) {
        return (
            <div className="page_container">
                <h2>Error: {error || 'School not found'}</h2>
                <button className="sport_button" onClick={() => {
                    navigate('/schools');
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }}>
                    Back to Schools
                </button>
            </div>
        );
    }
    return (
        <div className="page_container">
            {!isLoading && schoolData && schoolSports && (
                <>
                    <h1 className="header1">{`${schoolData.school_name}`}</h1>
                    <div className="sport_detail_container">
                        <a target='_blank' href={`https://${schoolData.website}`} className="sport_description">{schoolData.website}</a>
                        <div className="sport_info">
                            <p>Location: {`${schoolData.address} ${schoolData.city}, ${schoolData.state}`}</p>
                            <p>School Type: { schoolData.school_type_id === 2 ? 'College' : 'High School'}</p>
                        </div>
                        
                        
                    </div>

                    <h1 className='header2'>School Sports</h1>
                    <div className='school_sports_container'>
                        {schoolSports
                        .map((sport) => (
                            <button 
                                key={sport.sport_id}
                                className='sport_button'
                            >
                                <img className='button_icon' src={`/sports_logos/${sport.sport_name.replace(/\s/g, '').toLowerCase()}.png`}></img>
                                {sport.sport_name}
                            </button>
                        ))}
                    </div>
                </>
            )}
            <button className="sport_button" onClick={() => {
                navigate('/schools');
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }}>
                Back to Schools
            </button>

            {isAuthenticated && isAdmin && 
                <button onClick={openEditSchoolModal} className='add_sport_button'>Edit School Info</button>
            }
        </div>
    )
}

export default SchoolDetails;