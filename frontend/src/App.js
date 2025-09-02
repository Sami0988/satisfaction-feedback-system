import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider, useDarkMode } from "./context/DarkModeContext";
import Layout from "./components/Layout";
import LoadingSpinner from "./utils/LoadingSpinner";

// lazy imports
const WelcomePage = lazy(() => import("./pages/Service_Selection/WelcomePage"));
const DepartmentPage = lazy(() =>
  import("./pages/Service_Selection/DepartmentPage")
);
const ServicePage = lazy(() => import("./pages/Service_Selection/ServicePage"));
const EmployeePage = lazy(() =>
  import("./pages/Service_Selection/EmployeePage")
);

const SuspenseFallback = () => {
  const { darkMode } = useDarkMode();
  return <LoadingSpinner darkMode={darkMode} height="h-screen" />;
};

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Layout>
          <Suspense fallback={<SuspenseFallback />}>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/department" element={<DepartmentPage />} />
              <Route path="/service/:departmentId" element={<ServicePage />} />
              <Route
                path="employee/:departmentId/:serviceId"
                element={<EmployeePage />}
              />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </DarkModeProvider>
  );
}
export default App;
