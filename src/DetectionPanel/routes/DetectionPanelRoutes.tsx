import { Route, Routes } from "react-router-dom"
import { HomePage, ReportsPage, SurveillancePage } from "../pages"

export const DetectionPanelRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/surveillance" element={<SurveillancePage/>} />
        <Route path="/reports" element={<ReportsPage/>} />
    </Routes>
  )
}
