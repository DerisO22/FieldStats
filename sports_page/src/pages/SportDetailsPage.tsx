import { useEffect, useState } from "react"
import './pageStyles/common_styles.css'
import './pageStyles/sport.css'
import { useParams, useNavigate } from "react-router-dom";

interface Sport {
    sport_id: number;
    sport_name: string;
    sport_description: string;
    has_gender_division: boolean;
}

const SportDetailPage = () => {
    const { sportName } = useParams();
    const [sportData, setSportData] = useState<Sport | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sportName) {
            setError("Sport name not provided");
            setIsLoading(false);
            return;
        }

        fetch(`http://localhost:3001/sports_data/${sportName}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Sport not found');
                }
                return res.json();
            })
            .then((data) => {
                setSportData(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching sport data:", err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [sportName]);

    if (isLoading) {
        return (
            <div className="page_container">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error || !sportData) {
        return (
            <div className="page_container">
                <h2>Error: {error || 'Sport not found'}</h2>
                <button className="sport_button" onClick={() => navigate('/sports')}>
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
                        <p className="sport_description">{sportData.sport_description}</p>
                        <div className="sport_info">
                            <p>Sport ID: {sportData.sport_id}</p>
                            <p>Gender Divisions: {sportData.has_gender_division ? 'No' : 'Yes'}</p>
                        </div>
                    </div>
                </>
            )}
            <button className="sport_button" onClick={() => navigate('/sports')}>
                Back to Sports
            </button>
        </div>
    );
}

export default SportDetailPage;