
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Challenges from "./pages/Challenges";
import CreateChallenge from "./pages/CreateChallenge";
import ChallengeDetails from "./pages/ChallengeDetails";
import LogProgress from "./pages/LogProgress";
import Leaderboards from "./pages/Leaderboards";
import Notifications from "./pages/Notifications";
import Friends from "./pages/Friends";
import GroupChallenges from "./pages/GroupChallenges";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/create-challenge" element={<CreateChallenge />} />
          <Route path="/challenge/:id" element={<ChallengeDetails />} />
          <Route path="/challenge/:id/log-progress" element={<LogProgress />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/group-challenges" element={<GroupChallenges />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
