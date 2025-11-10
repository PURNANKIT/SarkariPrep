import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/pages/Home";
import Header from "./component/Header";
import ExamSelect from "./component/ExamSelect";
import PracticeSection from "./component/PracticeSection";
import Footer from "./component/Footer";
import AskAIButton from "./component/AskAIButton";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./component/pages/Signup";

function App() {
  return (
    
    <BrowserRouter>
    <Navbar/>
    
    <Routes>
      {/* <Route path="/" element={<Home/>}/> */}
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    <Header/>
    <ExamSelect/>
    <PracticeSection/>
    <Footer/>
    <AskAIButton/>
    </BrowserRouter>

    
  );
}

export default App;
