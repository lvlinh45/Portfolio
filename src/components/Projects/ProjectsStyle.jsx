import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0px 60px 0px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 960px) {
    padding: 30px 20px 30px 20px;
  }
`;

export const Header = styled.h2`
  color: #306ee8;
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 40px;
  text-align: left;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: #306ee8;
    border-radius: 2px;
  }
`;

export const ProjectItem = styled.div`
  display: flex;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Year = styled.div`
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  flex-shrink: 0;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProjectTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

export const ProjectDesc = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

export const Tag = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 2px 8px;
  border-radius: 10px;
`;

export const Links = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

export const GithubButton = styled.a`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  border: 1.5px solid ${({ theme }) => theme.primary};
  padding: 6px 14px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme }) => theme.primary + "15"};
    transform: translateY(-2px);
  }
`;

export const DemoButton = styled.a`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.white || "#ffffff"};
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 7px 16px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0 10px rgba(133, 76, 230, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(133, 76, 230, 0.6);
    filter: brightness(1.1);
  }
`;
