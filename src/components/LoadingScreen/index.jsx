import { motion } from "framer-motion";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";

const caesarCipher = (char, shift) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerAlphabet = alphabet.toLowerCase();
  if (alphabet.includes(char)) {
    const index = alphabet.indexOf(char);
    return alphabet[(index + shift) % alphabet.length];
  }
  if (lowerAlphabet.includes(char)) {
    const index = lowerAlphabet.indexOf(char);
    return lowerAlphabet[(index + shift) % lowerAlphabet.length];
  }

  return char;
};

const caesarDecipher = (char, shift) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerAlphabet = alphabet.toLowerCase();

  if (alphabet.includes(char)) {
    const index = alphabet.indexOf(char);
    return alphabet[(index - shift + alphabet.length) % alphabet.length];
  }
  if (lowerAlphabet.includes(char)) {
    const index = lowerAlphabet.indexOf(char);
    return lowerAlphabet[
      (index - shift + lowerAlphabet.length) % lowerAlphabet.length
    ];
  }
  return char;
};

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const Square = styled(motion.div)`
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background: linear-gradient(45deg, #ff61d2, #fe9090); // Pink to Peach
  /* background: linear-gradient(45deg, #4158d0, #c850c0); // Blue to Purple */
  /* background: linear-gradient(45deg, #0093e9, #80d0c7); // Ocean Blue */
  /* background: linear-gradient(45deg, #8ec5fc, #e0c3fc); // Soft Blue to Purple */
  margin: 0 5px;
  border-radius: 4px;
`;
const Text = styled(motion.h1)`
  color: white;
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
  background: linear-gradient(45deg, #6a11cb, #ff8c69);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: 24px;
  background: linear-gradient(45deg, #4a90e2, #9b59b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 8px;
  text-align: center;
  width: 100%;
`;

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [encodedText, setEncodedText] = useState("");
  const [finalDecodedText, setFinalDecodedText] = useState("");
  const intervalRef = useRef(null);
  const shift = 3;

  useEffect(() => {
    const text = "Hi. I’m Luong Van Linh";
    let encoded = "";
    for (let i = 0; i < text.length; i++) {
      encoded += caesarCipher(text[i], shift);
    }
    setEncodedText(encoded);

    let index = 0;
    intervalRef.current = setInterval(() => {
      let newText = "";
      for (let i = 0; i < encoded.length; i++) {
        if (i <= index) {
          newText += caesarDecipher(encoded[i], shift);
        } else {
          newText += encoded[i];
        }
      }
      setFinalDecodedText(newText);

      if (index === encoded.length - 1) {
        clearInterval(intervalRef.current);
      } else {
        index++;
      }
    }, 150);

    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 3800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, [loading]);

  if (!loading) return null;

  return (
    <Container
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <Text
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        {finalDecodedText}
        <Subtitle>
          <Typewriter
            options={{
              strings: ["Front-end Developer"],
              autoStart: true,
              loop: false,
              delay: 30,
              deleteSpeed: 9999999,
              cursor: "|",
              pauseFor: Infinity,
            }}
          />
        </Subtitle>
      </Text>
      <div style={{ display: "flex", marginTop: "16px" }}>
        {[0, 1, 2].map((index) => (
          <Square
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: [0.5, 1, 0.5],
              y: [-5, 5, -5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default LoadingScreen;
