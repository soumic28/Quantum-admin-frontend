"use client";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
// Pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Check from "./pages/Check";
import Profile from "./pages/Profile";
import Others from "./pages/Others";
import Turf from "./pages/Turf";
import Event from "./pages/Event";
import Product from "./pages/Product";
import { PartnerSignup } from "./components/Signup/index";
import { Login } from "./components/Login/index";
import { SidebarDesktop } from "./components/sidebar/sidebar-desktop";
import { Booking } from "./components/Booking/BookingList";
import { TurfDetails } from "./components/Turf/TurfDetails";
import { ProductDetails } from "./components/Product/ProductDetails";
import { EventDetails } from "./components/Event/EventDetails";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { sidebarItems } from "./constants";
import { Slot } from "./pages/Slot";
import Pass from "./pages/Pass";
import ScheduleDetails from "./pages/ScheduleDetails";

// ✅ Move QueryClient outside to persist state
const queryClient = new QueryClient();

type RequireAuthProps = {
  component: React.ComponentType<any>;
};

const RequireAuth: React.FC<RequireAuthProps> = ({ component: Component }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("accessToken");
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Error",
        description: "You are not authenticated",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, toast]);

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const LayoutWithSidebar = () => {
  const location = useLocation();
  const hiddenRoutes = ["/", "/login", "/partner"];
  const showSidebar = !hiddenRoutes.includes(location.pathname);

  return (
    <div>
      {showSidebar && (
        <div className="w-[300px]">
          <SidebarDesktop sidebarItems={sidebarItems} />
        </div>
      )}
      <div className={`${showSidebar ? "ml-[300px]" : "ml-0"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/partner" element={<PartnerSignup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<RequireAuth component={Dashboard} />} />
          <Route path="/slot" element={<Slot />} />
          <Route path="/slot/:id" element={<ScheduleDetails />} />
          <Route path="/turf" element={<Turf />} />
          <Route path="/turf/:id" element={<TurfDetails />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/pass" element={<Pass />} />
          <Route path="/others" element={<Others />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/logicCheck" element={<Check />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
};

export default function App() {
  useEffect(() => {
    // ✅ Load Razorpay script only once
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <LayoutWithSidebar />
      </Router>
    </QueryClientProvider>
  );
}
