import React, { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import Signup from "./component/pages/Signup";
import { UserProvider } from "./component/context/UserContext";
import Dashboard from "./component/Dashboard/Dashboard";
import QuizPage from "./component/Quiz/QuizPage";
import Practice from "./component/Practice/Practice";
import Syllabus from "./component/Syllabus/Syllabus";
import SyllabusQuestions from "./component/pages/SyllabusQuestions";
import Footer from "./component/footer/Footer";
import Hero from "./component/heroSection/Hero";
import PracticeHero from "./component/Practice/PracticeHero";
import ResetPassword from "./component/pages/ResetPassword";
import Profile from "./component/pages/Profile";
import PYQ from "./component/Pyq/PYQ";
import Quiz from "./component/Quiz/Quiz";
import Note from "./component/Note/Note";
import WathchVideo from "./component/WathchVideo/WathchVideo";
import NewsPaper from "./component/NewsPaper/NewsPaper";
import NotificationPage from "./component/notification/NotificationPage";
import AskAi from "./component/Ai/AskAi";

function AppContent() {
  const location = useLocation();

  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <Navbar />

      {location.pathname === "/dashboard" && (
        <Hero onOpenSignup={() => setShowSignup(true)} />
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:job" element={<QuizPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/practice/:job" element={<Practice />} />
        <Route path="/syllabus/:job" element={<Syllabus />} />
        <Route path="/question/:id" element={<SyllabusQuestions />} />
        <Route path="/videos/:job" element={<WathchVideo />} />
        <Route path="/pyq/:job" element={<PYQ />} />
        <Route path="/practice" element={<PracticeHero />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/news-paper" element={<NewsPaper />} />
        <Route path="/notes" element={<Note />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/askAi" element={<AskAi />} />
      </Routes>

      {showSignup && <Signup onClose={() => setShowSignup(false)} />}

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  );
}
