import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SportsPage from '../pages/SportsPage'
import NewsPage from '../pages/NewsPage'
import SchoolsPage from '../pages/SchoolsPage'
import SportDetailsPage from '../pages/SportDetailsPage'
import PlayersPage from '../pages/PlayersPage'

const PageRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/sports' element={<SportsPage />}/>
        <Route path='/sports/:sportName' element={<SportDetailsPage />} />
        <Route path='/news' element={<NewsPage />}/>
        <Route path='/schools' element={<SchoolsPage />}/>
        <Route path='/players' element={<PlayersPage />} />
    </Routes>
  )
}

export default PageRoutes;