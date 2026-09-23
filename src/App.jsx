import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Skills from "./components/Skills";
import Education from "./components/Education";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { useState } from "react";
import Footer from "./components/Footer";
import ProjectDetails from "./components/ProjectDetails";
import Publications from "./components/Publications";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import { PortfolioProvider } from "./context/PortfolioContext";
import AdminPortal from "./components/Admin/AdminPortal";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

const WrapperOne = styled.div`
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.12) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.12) 100%
    );
  width: 100%;
`;

const WrapperTwo = styled.div`
  background-color: ${({ theme }) => theme.bgLight};
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.primary + "10"};
  border-bottom: 1px solid ${({ theme }) => theme.primary + "10"};
`;

const MainPortfolio = ({ darkMode, setDarkMode }) => {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <>
      <ProgressBar />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Body>
        <Hero />
        <WrapperOne>
          <Education />
        </WrapperOne>
        <WrapperTwo>
          <Experience />
        </WrapperTwo>
        <WrapperOne>
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
        </WrapperOne>
        <WrapperTwo>
          <Publications />
        </WrapperTwo>
        {/* <WrapperOne>
          <Contact />
        </WrapperOne> */}
        <Footer />
        {openModal.state && (
          <ProjectDetails
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}
      </Body>
      <ScrollToTop
        smooth
        style={{
          width: "46px",
          height: "46px",
          backgroundColor: darkMode ? "#171721" : "#fff",
          borderRadius: "50%",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          border: `1px solid ${darkMode ? "#2d2d3b" : "#e0e0e0"}`,
        }}
        component={
          <IoIosArrowUp size={20} color={darkMode ? "#fff" : "#2d2d3b"} />
        }
      />
    </>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <PortfolioProvider>
      <AnimatePresence mode="wait">
        <LoadingScreen />
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Router>
            <Routes>
              <Route path="/admin/*" element={<AdminPortal />} />
              <Route path="/" element={<MainPortfolio darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AnimatePresence>
    </PortfolioProvider>
  );
}

export default App;
