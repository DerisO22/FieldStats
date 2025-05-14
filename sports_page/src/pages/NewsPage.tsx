import './pageStyles/newspage.css'
import './pageStyles/common_styles.css'
import { useEffect, useState } from 'react'
import { getAllNews, getFeaturedNews } from '../services/news_services'

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

    const fetchData = async() => {
        setIsLoading(true);

        try {
            const regularNewsData = await getAllNews();
            const featuredNewsData = await getFeaturedNews();

            const combinedNewsData = [...regularNewsData, ...featuredNewsData];
            setNewsData(combinedNewsData)
        } catch (error) {
            console.error('Error fetching sports data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
      <>
          <div className='page_container'>
              <h1 className='header1'>News Page</h1>

              <div className='cards_container'>
                  {isLoading ? (
                      <p className='text'>Loading news data...</p>
                  ) : (
                      newsData.length > 0 ? (
                        <div className='news_card_container'>
                            {newsData.slice(newsData.length - 21, newsData.length)
                            .filter(news => news.headline.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((news) => (
                              <div className='news_card' key={news.news_id}>
                                <img className='card_image' src='baseball_img.webp'></img>
                                <div className='card_text_container'>
                                  <h1 className='header2'>{news.headline}</h1>
                                  <p className='text'>Author - {news.author}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text'>No news available.</p>
                    )
                  )}
              </div>
          </div>
      </>
    )
}

export default NewsPage;