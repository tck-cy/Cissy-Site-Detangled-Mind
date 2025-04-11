import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AboutDrCissy from "./components/AboutDrCissy";
import Contact from "./components/Contact";
import YouTubeVideos from "./components/YouTubeVideos";
import BookAppointment from "./components/BookAppointment";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutDrCissy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/videos" element={<YouTubeVideos />} />
            <Route path="/BookAppointment" element={<BookAppointment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
