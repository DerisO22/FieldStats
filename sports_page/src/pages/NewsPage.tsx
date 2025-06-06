import './pageStyles/newspage.css'
import './pageStyles/common_styles.css'
import { useEffect, useState } from 'react'
import { getAllNews, getFeaturedNews, addNews, deleteNews } from '../services/news_services'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../contexts/ModalContext'
import { useAuth } from '../contexts/AuthContext'
import AddNews from '../components/component_operations/AddNews'

interface NewsCard {
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

interface NewsPageProps {
    searchTerm: string
}

const NewsPage = ({ searchTerm }: NewsPageProps) => {
    const [ newsData, setNewsData ] = useState<NewsCard[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { openModal, closeModal } = useModal();
    const { isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();

    const fetchData = async() => {
        setIsLoading(true);

        try {
            const regularNewsData = await getAllNews();
            const featuredNewsData = await getFeaturedNews();

            const combinedNewsData = [...regularNewsData, ...featuredNewsData];
            setNewsData(combinedNewsData)
        } catch (error) {
            console.error('Error fetching news data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const getImageForNews = (newsID: number) => {
        const imageIndex = newsID % 5 + 1;
        return `/news_page_images/news_poster_image${imageIndex}.webp`;
    }

    const handleDelete = async (news_id: number) => {
        setIsLoading(true);

        try {
            await deleteNews(news_id);
            fetchData();
        } catch (error) {
            console.error('Error fetching news data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddNews= async(newNewsData: {
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

        try {
            await addNews(newNewsData);
            console.log('Data after addition: ', newNewsData)
            await fetchData();
            closeModal();
        } catch (error) {
            console.error('Error adding news:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const openAddNewsModal = () => {
        openModal(
            <AddNews
                onSubmit={handleAddNews}
                isLoading={isLoading}
            />,
            "Create News Article"
        )
    }

    const handleNewsClick = (news_id: number) => {
        const news_URL = `/news/articles/${news_id}`;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        navigate(news_URL);
    }

    return (
        <>
            <div className='page_container'>
                <h1 className='header1'>Featured News</h1>

                <div className='cards_container'>
                    {isLoading ? (
                        <p className='text'>Loading news data...</p>
                    ) : (
                        newsData.length > 0 ? (
                            <div className='news_card_container'>
                                {newsData.slice(newsData.length - 21, newsData.length)
                                .filter(news => news.headline.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((news) => (
                                    <div onClick={() => handleNewsClick(news.news_id)} className='news_card' key={news.news_id}>
                                        <img 
                                            className='card_image' 
                                            src={getImageForNews(news.news_id)} 
                                            alt='News Poster'>
                                        </img>
                                        <div className='card_text_container'>
                                            <h1 className='headline'>{news.headline}</h1>
                                            <p className='author'>Author - {news.author}</p>
                                        </div>
                                        
                                        {isAuthenticated && isAdmin && 
                                            <div onClick={() => handleDelete(news.news_id)} className='delete_button'>Delete</div>
                                        }
                                    </div>
                                ))}
                            </div>


                        ) : (
                            <p className='text'>No news available.</p>
                        )
                    )}
                </div>

                {isAuthenticated && isAdmin && (
                    <button onClick={openAddNewsModal} className='add_news_button'>Add News</button>
                )}
            </div>
      </>
    )
}

export default NewsPage;