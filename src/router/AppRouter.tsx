import { Routes, Route } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes'
import { DetectionPanelRoutes } from '../DetectionPanel/routes'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/auth/*' element={<AuthRoutes/>} />
      <Route path='/*' element={<DetectionPanelRoutes/>} />
    </Routes>
  )
}
