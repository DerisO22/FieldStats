import { useEffect, useState } from "react"
import './pageStyles/common_styles.css'
import './pageStyles/sport.css'
import EditNews from "../components/component_operations/EditNews";
import { useParams, useNavigate } from "react-router-dom";
import { getSpecificNews } from "../services/news_services";
import { editNews } from "../services/news_services";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";

interface News {
    news_id: number,
    headline: string,
    author: string,
    publish_date: string,
    content: string,
    image_url: string,
    sport_id: number,
    team_id: number,
    features: boolean
}

const NewsDetailPage = () => {
    const { news_id } = useParams();
    const [newsData, setNewsData] = useState<News | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { isAuthenticated, isAdmin } = useAuth();

    const fetchData = async() => {
        if (!news_id) {
            setError("News article not provided");
            setIsLoading(false);
            return;
        }

        try {
            const data = await getSpecificNews(`${news_id}`);
            setNewsData(data);
        } catch (error) {
            console.error("Error fetching news data:", error);
            setError("Network Error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [news_id])

    const handleEditNews = async(data: {
        news_id: number,
        headline: string,
        author: string,
        publish_date: string,
        content: string,
        image_url: string,
        sport_id: number,
        team_id: number,
        features: boolean
    }) => {
        setIsLoading(true);

        const { news_id: _, ...restData } = data;
        const newData = { news_id: Number(newsData?.news_id) || 0, ...restData };

        try {
            await editNews(newData);
            await fetchData();
            closeModal();
        } catch {
            console.error("Error fetching news data:", error);
            setError("Network Error");
        } finally {
            setIsLoading(false);
        }
    }

    const openEditSportModal = () => {
        openModal(
            <EditNews
                currentNews={newsData}
                onSubmit={handleEditNews}
                isLoading={isLoading}
            />,
            `Edit ${newsData?.news_id}`
        )

    }

    if (isLoading) {
        return (
            <div className="page_container">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error || !newsData) {
        return (
            <div className="page_container">
                <h2>Error: {error || 'News Article not found'}</h2>
                <button className="sport_button" onClick={() => {
                    navigate('/news');
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }}>
                    Back to News
                </button>
            </div>
        );
    }

    return (
        <div className="page_container">
            {!isLoading && newsData && (
                <>
                    <h1 className="header1">{newsData.headline}</h1>
                    <p className="text">Author - {newsData.author}</p>
                    <p className="text">{(newsData.publish_date).substring(0,10)}</p>
                    <p className="text">Sport: {newsData.sport_id}</p>
                    <div className="sport_detail_container">
                        <div className="sport_info">
                            <p className="text">{newsData.content}</p>
                        </div>
                    </div>
                </>
            )}
            <button className="return_to_sports_button" onClick={() => {
                navigate('/news');
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }}>
                Back to Featured News
            </button>

            {isAuthenticated && isAdmin && 
                <button onClick={openEditSportModal} className='add_sport_button'>Edit Article{newsData.news_id}</button>
            }
        </div>
    );
}

export default NewsDetailPage;