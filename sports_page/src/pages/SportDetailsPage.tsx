import { useEffect, useState } from "react"
import './pageStyles/common_styles.css'
import './pageStyles/sport.css'
import { useParams, useNavigate } from "react-router-dom";
import { getSportDetails, editSport } from "../services/sports_service";
import { useModal } from "../contexts/ModalContext";
import EditSport from "../components/component_operations/EditSport";
import { useAuth } from "../contexts/AuthContext";
import { Sport } from "../types/sports_types";
import Loader from "../components/Loader";

const SportDetailPage = () => {
    const { sportName } = useParams();
    const [sportData, setSportData] = useState<Sport | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { isAuthenticated, isAdmin } = useAuth();

    const fetchData = async() => {
        if (!sportName) {
            setError("Sport name not provided");
            setIsLoading(false);
            return;
        }

        try {
            const data = await getSportDetails(sportName);
            setSportData(data);
        } catch (error) {
            console.error("Error fetching sport data:", error);
            setError("Network Error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [sportName])

    const handleEditSport = async(data: {
        sport_description: string,
        has_gender_division: boolean
    }) => {
        setIsLoading(true);

        const newData = { sport_name: sportData?.sport_name || '', ...data}

        try {
            await editSport(newData);
            await fetchData();
            closeModal();
        } catch {
            console.error("Error fetching sport data:", error);
            setError("Network Error");
        } finally {
            setIsLoading(false);
        }
    }

    const openEditSportModal = () => {
        openModal(
            <EditSport 
                onSubmit={handleEditSport}
                isLoading={isLoading}
            />,
            `Edit ${sportData?.sport_name}`
        )

    }

    if (isLoading) {
        return (
            <div className="page_container">
                <Loader />
            </div>
        );
    }

    if (error || !sportData) {
        return (
            <div className="page_container">
                <h2>Error: {error || 'Sport not found'}</h2>
                <button className="sport_button" onClick={() => {
                    navigate('/sports');
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    }}>
                    Back to Sports
                </button>
            </div>
        );
    }

    return (
        <div className="page_container">
            {!isLoading && sportData && (
                <>
                    <h1 className="header1">{sportData.sport_name}</h1>
                    <div className="sport_detail_container">
                        <img className="sport_detail_image" src={`/sports_logos/${sportData.sport_name.replace(/\s/g, '').toLowerCase()}.png`}></img>
                        <p className="sport_description">{sportData.sport_description}</p>
                        <div className="sport_info">
                            <p>Gender Divisions: {sportData.has_gender_division ? 'No' : 'Yes'}</p>
                        </div>
                    </div>
                </>
            )}
            <button className="return_to_sports_button" onClick={() => {
                    navigate('/sports');
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }}>
                Back to Sports
            </button>

            {isAuthenticated && isAdmin && 
                <button onClick={openEditSportModal} className='add_sport_button'>Edit {sportData.sport_name}</button>
            }
        </div>
    );
}

export default SportDetailPage;