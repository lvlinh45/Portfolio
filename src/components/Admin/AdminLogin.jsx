import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { usePortfolioData } from "../../context/PortfolioContext";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LoginContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #090a14;
  background-image: radial-gradient(
      circle at 20% 20%,
      rgba(133, 76, 230, 0.15) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(48, 110, 232, 0.15) 0%,
      transparent 40%
    );
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 420px;
  background: rgba(20, 22, 39, 0.75);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #854ce6 0%, #306ee8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(133, 76, 230, 0.35);

  svg {
    font-size: 28px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 6px 0;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  margin: 0 0 28px 0;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .icon {
    position: absolute;
    left: 14px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 20px;
    pointer-events: none;
    z-index: 2;
  }

  &:focus-within .icon {
    color: #854ce6;
  }

  .toggle-pw {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    z-index: 2;
    transition: color 0.2s ease;

    &:hover {
      color: #ffffff;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  background: #0e101f !important;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  padding: ${({ $hasRightIcon }) => ($hasRightIcon ? "13px 42px 13px 44px" : "13px 14px 13px 44px")};
  color: #ffffff !important;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #854ce6;
    box-shadow: 0 0 0 3px rgba(133, 76, 230, 0.25);
    background: #121426 !important;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 40px #0e101f inset !important;
    -webkit-text-fill-color: #ffffff !important;
    caret-color: #ffffff !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #854ce6 0%, #306ee8 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
  box-shadow: 0 8px 24px rgba(133, 76, 230, 0.3);

  &:hover {
    filter: brightness(1.15);
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(133, 76, 230, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorBanner = styled(motion.div)`
  width: 100%;
  background: rgba(229, 57, 53, 0.15);
  border: 1px solid rgba(229, 57, 53, 0.4);
  color: #ff6b6b;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  text-align: center;
  margin-bottom: 12px;
`;



const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 13px;
  margin-top: 20px;
  transition: color 0.2s ease;

  &:hover {
    color: #854ce6;
  }
`;

const AdminLogin = () => {
  const { login } = usePortfolioData();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
      return;
    }

    const res = login(username, password);
    if (!res.success) {
      setErrorMessage(res.error || "Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <IconWrapper>
          <LockOutlinedIcon />
        </IconWrapper>
        <Title>Portfolio CMS Admin</Title>
        <Subtitle>Đăng nhập để quản lý thông tin hiển thị trên Portfolio</Subtitle>

        {errorMessage && (
          <ErrorBanner
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            {errorMessage}
          </ErrorBanner>
        )}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Tên đăng nhập</label>
            <InputWrapper>
              <PersonOutlineIcon className="icon" />
              <StyledInput
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <label>Mật khẩu</label>
            <InputWrapper>
              <LockOutlinedIcon className="icon" />
              <StyledInput
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                $hasRightIcon={true}
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </InputWrapper>
          </InputGroup>

          <SubmitButton type="submit">Đăng nhập</SubmitButton>
        </Form>

        <BackLink to="/">
          <ArrowBackIcon style={{ fontSize: 16 }} /> Quay lại Portfolio
        </BackLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;
