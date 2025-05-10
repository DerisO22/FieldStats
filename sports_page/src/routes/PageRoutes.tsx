import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SportsPage from '../pages/SportsPage'
import NewsPage from '../pages/NewsPage'
import SchoolsPage from '../pages/SchoolsPage'
import SportDetailsPage from '../pages/SportDetailsPage'
import PlayersPage from '../pages/PlayersPage'
import PlayerDetailsPage from '../pages/PlayerDetailsPage'
import SchoolDetailsPage from '../pages/SchoolDetailsPage'

const PageRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/sports' element={<SportsPage />}/>
        <Route path='/sports/:sportName' element={<SportDetailsPage />} />
        <Route path='/news' element={<NewsPage />}/>
        <Route path='/schools' element={<SchoolsPage />}/>
        <Route path='/schools/:school_id' element={<SchoolDetailsPage />} />
        <Route path='/players' element={<PlayersPage />} />
        <Route path='/players/player_profile/:player_id' element={<PlayerDetailsPage />} />
    </Routes>
  )
}

export default PageRoutes;