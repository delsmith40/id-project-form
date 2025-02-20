import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import AnalyzePage from "./pages/AnalyzePage";
import DesignPage from "./pages/DesignPage";
import DevelopPage from "./pages/DevelopPage";
import ImplementPage from "./pages/ImplementPage";
import EvaluatePage from "./pages/EvaluatePage";
import DocumentPage from "./pages/DocumentPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProjectsListPage from "./pages/ProjectsListPage";
import ProjectPage from "./pages/ProjectPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout><Outlet /></Layout>}>
          <Route index element={<Index />} />
          <Route path="analyze" element={<AnalyzePage />} />
          <Route path="design" element={<DesignPage />} />
          <Route path="develop" element={<DevelopPage />} />
          <Route path="implement" element={<ImplementPage />} />
          <Route path="evaluate" element={<EvaluatePage />} />
          <Route path="document" element={<DocumentPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="projects-list" element={<ProjectsListPage />} />
          <Route path="project/:id" element={<ProjectPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;