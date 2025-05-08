import { useState, useEffect } from 'react'
import './pageStyles/sportspage.css'
import './pageStyles/common_styles.css'
import { useNavigate } from 'react-router-dom'

interface Sport {
    sport_id: number,
    sport_name: string,
    sport_description: string,
    has_gender_division: boolean,
}

const SportsPage = () => {
    const [ sportsData, setSportsData ] = useState<Sport[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const navigate = useNavigate();

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
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='page_container'>
            <h1 className='header1'>Sports</h1>

            <div className='sports_container'>
                {isLoading ? (
                    <p>Loading sports...</p>
                ) : (
                    sportsData.map((sport) => (
                        <button 
                            key={sport.sport_id}
                            className='sport_button'
                            onClick={() => {
                                // Use consistent casing and add debugging
                                const sportUrl = `/sports/${sport.sport_name.toLowerCase()}`;
                                console.log("Navigating to:", sportUrl);
                                navigate(sportUrl);
                            }}
                        >
                            {sport.sport_name}
                        </button>
                    ))
                )}
            </div>
        </div>
    )
}

export default SportsPage;