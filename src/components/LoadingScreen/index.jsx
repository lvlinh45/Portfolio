import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.card_light};
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Text = styled(motion.h1)`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Square = styled(motion.div)`
  width: 9px;
  height: 9px;
  background-color: ${({ theme }) => theme.text_primary};
  margin: 0 4px;
  border-radius: 2px;

  @media (max-width: 768px) {
    width: 8px;
    height: 8px;
  }
`;

const LoadingScreen = () => {
  return (
    <Container
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.75, delay: 1 }}
      exit={{ opacity: 0 }}
    >
      <Text
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
      >
        Hi. I &apos; m Luong Van Linh
      </Text>

      <div style={{ display: "flex", marginTop: "16px" }}>
        {[0, 1, 2].map((index) => (
          <Square
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default LoadingScreen;
