// import { Toaster } from "../components/ui/toaster";
// import { Toaster as Sonner } from "../components/ui/sonner";
// import { TooltipProvider } from "../components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import GalleryCategory from "./pages/GalleryCategory";
import VoiceChat from "./components/Voice";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects/:projectId" element={<Projects />} />
          <Route path="/project/:projectId/gallery/:category" element={<GalleryCategory />} />
          <Route path="/voice" element={<VoiceChat/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    
  </QueryClientProvider>
  
    

  
);

export default App;