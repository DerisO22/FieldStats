import { Route, Routes } from 'react-router-dom'
import { memo } from 'react'
import HomePage from '../pages/HomePage'
import SportsPage from '../pages/SportsPage'
import NewsPage from '../pages/NewsPage'
import SchoolsPage from '../pages/SchoolsPage'
import SportDetailsPage from '../pages/SportDetailsPage'
import PlayersPage from '../pages/PlayersPage'
import PlayerDetailsPage from '../pages/PlayerDetailsPage'
import SchoolDetailsPage from '../pages/SchoolDetailsPage'
import NewsDetailPage from '../pages/NewsDetailsPage'

interface PageRouteProps {
    searchTerm: string;
}

const PageRoutes = ({ searchTerm }: PageRouteProps) => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}/>

            <Route path='/sports' element={<SportsPage searchTerm={searchTerm} />}/>
            <Route path='/sports/:sportName' element={<SportDetailsPage />} />

            <Route path='/news' element={<NewsPage searchTerm={searchTerm} />}/>
            <Route path='/news/articles/:news_id' element={<NewsDetailPage />}/>

            <Route path='/schools' element={<SchoolsPage searchTerm={searchTerm} />}/>
            <Route path='/schools/:school_id' element={<SchoolDetailsPage />} />

            <Route path='/players' element={<PlayersPage searchTerm={searchTerm} />} />
            <Route path='/players/player_profile/:player_id' element={<PlayerDetailsPage />} />
        </Routes>
    )
}

export default memo(PageRoutes, (prevProps, nextProps) => prevProps.searchTerm === nextProps.searchTerm);