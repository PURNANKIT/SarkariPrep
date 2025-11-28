// src/App.jsx
import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./component/pages/Signup";
import { UserProvider } from "./component/context/UserContext";
import Dashboard from "./component/Dashboard/Dashboard";
import QuizPage from "./component/Quiz/QuizPage";
import Practice from "./component/Practice/Practice";
import Syllabus from "./component/Syllabus/Syllabus";
import SyllabusQuestions from "./component/pages/SyllabusQuestions";
import ResetPassword from "./component/pages/ResetPassword";
import PYQ from "./component/Pyq/Pyq";
import Quiz from "./component/Quiz/Quiz";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz/:job" element={<QuizPage />} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/practice/:job" element={<Practice/>}/>
          <Route path="/syllabus/:job" element={<Syllabus/>}/>
          <Route path="/question/:job" element={<SyllabusQuestions/>} />
          <Route path="/pyq/:job" element={<PYQ/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
