// import { Toaster } from "../components/ui/toaster";
// import { Toaster as Sonner } from "../components/ui/sonner";
// import { TooltipProvider } from "../components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import GalleryCategory from "./pages/GalleryCategory";
import ModelCanvas from "./components/ModelCanvas";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    
      <ModelCanvas/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects/:projectId" element={<Projects />} />
          <Route path="/project/:projectId/gallery/:category" element={<GalleryCategory />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    
  </QueryClientProvider>
  
    

  
);

export default App;