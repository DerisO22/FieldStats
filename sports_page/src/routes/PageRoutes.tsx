import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SportsPage from '../pages/SportsPage'
import NewsPage from '../pages/NewsPage'
import SchoolsPage from '../pages/SchoolsPage'
import SportDetailsPage from '../pages/SportDetailsPage'

const PageRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/sports' element={<SportsPage />}/>
        <Route path='/sports/:sportName' element={<SportDetailsPage />} />
        <Route path='/news' element={<NewsPage />}/>
        <Route path='/schools' element={<SchoolsPage />}/>
    </Routes>
  )
}

export default PageRoutes;