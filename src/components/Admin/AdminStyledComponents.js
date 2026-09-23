import styled from "styled-components";
import { motion } from "framer-motion";

export const AdminContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #0b0c16;
  color: #f2f3f4;
  font-family: "Poppins", sans-serif;
  display: flex;
  position: relative;
  overflow-x: hidden;
`;

export const AdminSidebar = styled.aside`
  width: 260px;
  background: rgba(18, 19, 34, 0.95);
  backdrop-filter: blur(12px);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  transition: transform 0.3s ease;

  @media (max-width: 900px) {
    transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
    box-shadow: ${({ $isOpen }) => ($isOpen ? "0 0 30px rgba(0,0,0,0.8)" : "none")};
  }
`;

export const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px 24px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 16px;

  h2 {
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(135deg, #854ce6 0%, #306ee8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
  span {
    font-size: 11px;
    background: rgba(133, 76, 230, 0.2);
    color: #854ce6;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 600;
  }
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  overflow-y: auto;
`;

export const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: none;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(90deg, rgba(133, 76, 230, 0.25) 0%, rgba(48, 110, 232, 0.15) 100%)"
      : "transparent"};
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255, 255, 255, 0.65)")};
  font-weight: ${({ $active }) => ($active ? "600" : "500")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: ${({ $active }) => ($active ? "3px solid #854ce6" : "3px solid transparent")};
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }

  svg {
    font-size: 18px;
    color: ${({ $active }) => ($active ? "#854ce6" : "inherit")};
  }
`;

export const SidebarFooter = styled.div`
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AdminMain = styled.main`
  flex: 1;
  margin-left: 260px;
  min-height: 100vh;
  padding: 32px 40px;
  background: #0d0f1d;
  background-image: radial-gradient(at 10% 10%, rgba(133, 76, 230, 0.06) 0px, transparent 50%),
    radial-gradient(at 90% 90%, rgba(48, 110, 232, 0.06) 0px, transparent 50%);

  @media (max-width: 900px) {
    margin-left: 0;
    padding: 24px 16px;
  }
`;

export const TopHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const HeaderTitle = styled.div`
  h1 {
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 6px 0;
  }
  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.55);
    margin: 0;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MobileMenuToggle = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Card = styled(motion.div)`
  background: rgba(22, 24, 43, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;

  label {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

export const Input = styled.input`
  background: rgba(11, 12, 22, 0.8) !important;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 12px 14px;
  color: #ffffff !important;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: #854ce6;
    box-shadow: 0 0 0 3px rgba(133, 76, 230, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 40px #0b0c16 inset !important;
    -webkit-text-fill-color: #ffffff !important;
    caret-color: #ffffff !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const TextArea = styled.textarea`
  background: rgba(11, 12, 22, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 12px 14px;
  color: #ffffff;
  font-size: 14px;
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: #854ce6;
    box-shadow: 0 0 0 3px rgba(133, 76, 230, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ $variant }) =>
    $variant === "secondary"
      ? "rgba(255, 255, 255, 0.08)"
      : $variant === "danger"
      ? "linear-gradient(135deg, #e53935 0%, #c62828 100%)"
      : $variant === "success"
      ? "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)"
      : "linear-gradient(135deg, #854ce6 0%, #306ee8 100%)"};
  color: #ffffff;
  border: ${({ $variant }) => ($variant === "secondary" ? "1px solid rgba(255, 255, 255, 0.15)" : "none")};
  border-radius: 8px;
  padding: ${({ $size }) => ($size === "small" ? "6px 12px" : "10px 18px")};
  font-size: ${({ $size }) => ($size === "small" ? "12px" : "14px")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    filter: brightness(1.15);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemCard = styled.div`
  background: rgba(14, 15, 28, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(133, 76, 230, 0.3);
    background: rgba(18, 20, 36, 0.8);
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const ItemInfo = styled.div`
  flex: 1;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 4px 0;
  }
  .sub {
    font-size: 13px;
    color: #854ce6;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .date {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    margin-bottom: 8px;
  }
  .desc {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
  }
`;

export const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

export const Tag = styled.span`
  font-size: 11px;
  background: rgba(133, 76, 230, 0.15);
  color: #a77df8;
  border: 1px solid rgba(133, 76, 230, 0.3);
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 500;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled(motion.div)`
  background: #15172b;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 28px;
  width: 100%;
  max-width: 620px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
`;

export const ToastNotification = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: ${({ $type }) => ($type === "error" ? "#e53935" : "#2e7d32")};
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  z-index: 2000;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;
