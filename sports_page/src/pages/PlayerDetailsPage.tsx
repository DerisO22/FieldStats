import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlayerDetails } from "../services/players_service";

interface PlayerStats {
    stat_id: number,
    player_id: number,
    sport_name: string,
    season: string,
    stats: any
}

interface Player {
    player_id: number,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender_id: number,
    bio: string,
    stats?: PlayerStats[]
}

const PlayerDetailsPage = () => {
    const { player_id } = useParams();
    const [playerData, setPlayerData] = useState<Player | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    const fetchData = async () => {
        try {
            const data = await getPlayerDetails(`${player_id}`);
            setPlayerData(data);
        } catch (error) {
            console.log("error: ", error);
            setError("error");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [player_id])

    // Function to render stats object as formatted text
    const renderStats = (stats: any) => {
        if (!stats) return <p>No stats data available</p>;
        
        if (typeof stats !== 'object' || stats === null) {
            return <p>{String(stats)}</p>;
        }
        
        return (
            <div className="stats-details">
                {Object.entries(stats).map(([key, value]) => (
                    <p key={key}>
                        <span className="text">{key.replace(/_/g, ' ')}: </span>
                        <span className="text">{value !== null && value !== undefined ? String(value) : 'N/A'}</span>
                    </p>
                ))}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="page_container">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error || !playerData) {
        return (
            <div className="page_container">
                <h2>Error: {error || 'Player not found'}</h2>
                <button className="sport_button" onClick={() => {
                    navigate('/players');
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    }}>
                    Back to Players
                </button>
            </div>
        );
    }
  
    return (
        <div className="page_container">
            {!isLoading && playerData && (
                <>
                    <h1 className="header1">{`${playerData.first_name} ${playerData.last_name}`}</h1>
                    <div className="sport_detail_container">
                        <p className="sport_description">{playerData.bio}</p>
                        <section className="sport_info">
                            <p>Player ID: {playerData.player_id}</p>
                            <p>Date of Birth: {playerData.date_of_birth}</p>
                        </section>

                        <section className="player_stats">
                            {playerData.stats && playerData.stats.length > 0 ? (
                                <>
                                    {playerData.stats
                                        .filter(stat => stat !== null && stat !== undefined)
                                        .map((stat, index) => (
                                            <div key={stat?.stat_id || `stat-${index}`} className="stat-item">
                                                <h3 className="header1">{stat?.sport_name || 'No sport name'} (Player ID: {stat?.player_id || 'N/A'})</h3>
                                                <h4 className="header1">Season: {stat?.season || 'N/A'}</h4>
                                                {stat?.stats ? renderStats(stat.stats) : <p>No detailed stats available</p>}
                                            </div>
                                        ))}
                                </>
                            ) : (
                                <p className="header1">No stats available for this player</p>
                            )}
                        </section>
                    </div>
                </>
            )}
            <button className="sport_button" onClick={() => {
                navigate('/players');
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                }}>
                Back to Players
            </button>
        </div>
    )
}

export default PlayerDetailsPage