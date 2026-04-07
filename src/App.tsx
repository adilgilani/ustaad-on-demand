import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import SplashScreen from "@/components/SplashScreen";
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

const App = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div>
          {/* ── iPhone Shell ── */}
          <div className="iphone-shell">
            <div className="iphone-screen">

              {/* Splash Screen */}
              {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

              {/* Status Bar */}
              <div className="iphone-status-bar">
                <span className="iphone-status-time">9:41</span>

                {/* Dynamic Island */}
                <div className="iphone-dynamic-island" />

                {/* Right icons: signal · wifi · battery */}
                <div className="iphone-status-icons">
                  {/* Cellular */}
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                    <rect x="0" y="7" width="3" height="5" rx="1" fill="#000"/>
                    <rect x="4.5" y="4.5" width="3" height="7.5" rx="1" fill="#000"/>
                    <rect x="9" y="2" width="3" height="10" rx="1" fill="#000"/>
                    <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#000"/>
                  </svg>
                  {/* Wifi */}
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="#000"/>
                    <path d="M3.5 6.5A6.5 6.5 0 0 1 8 4.8a6.5 6.5 0 0 1 4.5 1.7" stroke="#000" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                    <path d="M1 3.8A10.5 10.5 0 0 1 8 1a10.5 10.5 0 0 1 7 2.8" stroke="#000" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                  </svg>
                  {/* Battery */}
                  <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                    <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#000" strokeOpacity="0.35"/>
                    <rect x="2" y="2" width="17" height="8" rx="2" fill="#000"/>
                    <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="#000" fillOpacity="0.4"/>
                  </svg>
                </div>
              </div>

              {/* App Content */}
              <div className="iphone-content">
                <div className="iphone-scroll-wrapper phone-frame bg-background">
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
                </div>
              </div>

              {/* Bottom Nav — pinned inside the phone, outside scroll */}
              <BottomNav />

              {/* Home Indicator */}
              <div className="iphone-home-indicator">
                <div className="iphone-home-bar" />
              </div>

            </div>
          </div>

          {/* Label */}
          <p className="iphone-label">iPhone 15 Pro</p>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
