import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlayerDetails, editPlayer } from "../services/players_service";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";
import EditPlayer from "../components/component_operations/EditPlayer";
import { useTheme } from "../contexts/ThemeContext";
import { PlayerStats, EditPlayerDetails, ChartDataEntry } from "../types/players_types";
import Loader from "../components/Loader";

export interface Player {
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
    const { openModal, closeModal } = useModal();
    const { isAuthenticated, isAdmin } = useAuth();
    const { theme } = useTheme();

    const fetchData = async () => {
        try {
            const data = await getPlayerDetails(`${player_id}`);
            setPlayerData(data);
            console.log(data)
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

    const handleEditPlayer = async(player_data: EditPlayerDetails) => {
        setIsLoading(true);

        try {
            await editPlayer(player_data);
            await fetchData();
            closeModal();
        } catch(error) {
            console.error('Error fetching players data:', error);
        } finally {
            setIsLoading(false)
        }
    }

    const openEditPlayerModal = () => {
        openModal(
            <EditPlayer
                currentPlayer={playerData || undefined}
                onSubmit={handleEditPlayer}
                isLoading={isLoading}
            />,
            'Edit Player Details'
        )
    }

    const organizeChartData = (statsArray: PlayerStats[]): ChartDataEntry[] => {
        const chartData: ChartDataEntry[] = [];

        if(!Array.isArray(statsArray)) return chartData;

        statsArray.forEach(statEntry => {
            const stats = statEntry?.stats;

            if (stats && typeof stats === 'object'){
                Object.entries(stats).forEach(([key, value]) => {
                    if(key === 'stat_id') return;

                    if (typeof value === 'number'){
                        chartData.push({
                            name: key.replace(/_/g, ' '),
                            value: value
                        })
                    }
                })
            }
        })

        return chartData;
    }

    if (isLoading) {
        return (
            <div className="page_container">
                <Loader />
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
                            <p className="text">Player ID: {playerData.player_id}</p>
                            <p className="text">Date of Birth: {(playerData.date_of_birth)}</p>
                        </section>

                        <section className="player_stats">
                            {!playerData.stats || playerData.stats.filter(stat => stat !== null && stat !== undefined).length === 0 ? (
                                <p className="header1">No stats available for this player</p>
                            ) : (
                                <>
                                    {playerData.stats
                                        // Filter any null stats
                                        .filter(stat => stat !== null && stat !== undefined)
                                        .map((stat, index) => (
                                            <div key={stat?.stat_id || `stat-${index}`} className="stat-item">
                                                <h3 className="header1">{stat?.sport_name || 'No sport name'}</h3>
                                                <h4 className="header1">Season: {stat?.season || 'N/A'}</h4>
                                                {playerData.stats && (
                                                    <ResponsiveContainer className="chart_container" width='100%' height={400}>
                                                        <PieChart width={500} height={500}>
                                                            <Pie 
                                                                data={organizeChartData([playerData.stats[index]])} 
                                                                dataKey="value" 
                                                                nameKey="name" 
                                                                cx="50%" 
                                                                cy="50%" 
                                                                outerRadius={80} 
                                                                fill="#005eb8" 
                                                                label={({ name, value, x, y, cx, cy, midAngle, outerRadius, percent }) => {
                                                                    const RADIAN = Math.PI / 180;
                                                                    const radius = outerRadius + 30;
                                                                    const xPos = cx + radius * Math.cos(-midAngle * RADIAN);
                                                                    const yPos = cy + radius * Math.sin(-midAngle * RADIAN);
                                                            
                                                                    return (
                                                                    <text
                                                                        x={xPos}
                                                                        y={yPos}
                                                                        fill={theme === "dark" ? "white" : "#005eb8"}
                                                                        textAnchor={xPos > cx ? "start" : "end"}
                                                                        dominantBaseline="central"
                                                                        fontSize={12}
                                                                        fontWeight="bold"
                                                                    >
                                                                        {`${name}: ${value}`}
                                                                    </text>
                                                                    );
                                                                }}
                                                            />
                                                            <Tooltip />
                                                            <Legend 
                                                                wrapperStyle={{
                                                                    color: 'white'
                                                                }}
                                                            />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                )}
                                            </div>
                                        ))
                                    }
                                    
                                </>
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

            {isAuthenticated && isAdmin && 
                <button onClick={openEditPlayerModal} className='add_sport_button'>Edit Player</button>
            }
        </div>
    )
}

export default PlayerDetailsPage;