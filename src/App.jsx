import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Skills from "./components/Skills";
import Education from "./components/Education";
import { BrowserRouter as Router } from "react-router-dom";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { useState } from "react";
import Footer from "./components/Footer";
import ProjectDetails from "./components/ProjectDetails";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  console.log(openModal);
  return (
    <AnimatePresence mode="wait">
      <LoadingScreen />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Router>
          <ProgressBar></ProgressBar>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Body>
            <Hero />
            <Wrapper>
              <Skills />
              <Experience />
            </Wrapper>
            <Projects openModal={openModal} setOpenModal={setOpenModal} />
            <Wrapper>
              <Education />
              <Contact />
            </Wrapper>
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
            }}
            component={<IoIosArrowUp size={18} />}
          />
        </Router>
      </ThemeProvider>
    </AnimatePresence>
  );
}

export default App;
