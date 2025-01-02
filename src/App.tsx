import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import AnalyzePage from "./pages/AnalyzePage";
import DesignPage from "./pages/DesignPage";
import DevelopPage from "./pages/DevelopPage";
import ImplementPage from "./pages/ImplementPage";
import EvaluatePage from "./pages/EvaluatePage";
import DocumentPage from "./pages/DocumentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="/develop" element={<DevelopPage />} />
            <Route path="/implement" element={<ImplementPage />} />
            <Route path="/evaluate" element={<EvaluatePage />} />
            <Route path="/document" element={<DocumentPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;