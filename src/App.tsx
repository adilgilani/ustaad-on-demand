import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Home from "./pages/Home";
import OtherIssues from "./pages/OtherIssues";
import Location from "./pages/Location";
import UploadPhoto from "./pages/UploadPhoto";
import PetrolFlow from "./pages/PetrolFlow";
import MapOffers from "./pages/MapOffers";
import Tracking from "./pages/Tracking";
import Chat from "./pages/Chat";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="phone-frame bg-background min-h-screen relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/other-issues" element={<OtherIssues />} />
            <Route path="/location" element={<Location />} />
            <Route path="/upload-photo" element={<UploadPhoto />} />
            <Route path="/petrol-flow" element={<PetrolFlow />} />
            <Route path="/map-offers" element={<MapOffers />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/requests" element={<ComingSoon />} />
            <Route path="/nearby" element={<ComingSoon />} />
            <Route path="/profile" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
