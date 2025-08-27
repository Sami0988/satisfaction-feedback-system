import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/Service_Selection/WelcomePage";
import DepartmentPage from "./pages/Service_Selection/DepartmentPage";
import ServicePage from "./pages/Service_Selection/ServicePage";
import EmployeePage from "./pages/Service_Selection/EmployeePage";


function App() {
  return (
    /* Define routes for the appn */
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/department" element={<DepartmentPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/employee" element={<EmployeePage />} />    
      </Routes>
    </Router>
  );
}

export default App;
