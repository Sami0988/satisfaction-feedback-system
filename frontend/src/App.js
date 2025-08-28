import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import Layout from "./components/Layout";

// lazy imports
const WelcomePage = lazy(() => import("./pages/Service_Selection/WelcomePage"));
const DepartmentPage = lazy(() =>
  import("./pages/Service_Selection/DepartmentPage")
);
const ServicePage = lazy(() => import("./pages/Service_Selection/ServicePage"));
const EmployeePage = lazy(() =>
  import("./pages/Service_Selection/EmployeePage")
);

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Layout>
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/department" element={<DepartmentPage />} />
              <Route path="/service" element={<ServicePage />} />
              <Route path="/employee" element={<EmployeePage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </DarkModeProvider>
  );
}
export default App;



