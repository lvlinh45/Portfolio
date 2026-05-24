import React from "react";
import styled from "styled-components";
import { experiences } from "../../data/constants";

const Container = styled.div`
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

const Header = styled.h2`
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

const TimelineContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 201px; /* Center of the dot in desktop */
  top: 6px;
  bottom: 6px;
  width: 1.5px;
  background: rgba(255, 255, 255, 0.08);
  
  @media (max-width: 768px) {
    left: 16px;
  }
`;

const TimelineItem = styled.div`
  display: flex;
  position: relative;
  padding-bottom: 45px;
  
  &:last-child {
    padding-bottom: 0;
  }

  &:hover {
    .timeline-dot {
      background: #854CE6;
      box-shadow: 0 0 15px #854CE6;
      transform: scale(1.3);
    }
    .timeline-content {
      transform: translateX(8px);
      color: ${({ theme }) => theme.white};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 36px;
  }
`;

const Year = styled.div`
  width: 180px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  flex-shrink: 0;
  padding-top: 2px;
  
  @media (max-width: 768px) {
    width: auto;
    margin-bottom: 12px;
    font-size: 14px;
  }
`;

const DotContainer = styled.div`
  width: 42px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 6px;
  flex-shrink: 0;
  z-index: 2;
  
  @media (max-width: 768px) {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 32px;
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(133, 76, 230, 0.2);
  border: 2px solid #854CE6;
  box-shadow: 0 0 8px rgba(133, 76, 230, 0.5);
  transition: all 0.3s ease-in-out;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.3s ease-in-out;
  padding-left: 10px;
  
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const Company = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Role = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #854CE6;
`;

const Experience = () => {
  return (
    <Container id="experience">
      <Header>Experience</Header>
      <TimelineContainer>
        <TimelineLine />
        {experiences.map((exp, index) => {
          return (
            <TimelineItem key={index}>
              <Year>{exp.date}</Year>
              <DotContainer>
                <Dot className="timeline-dot" />
              </DotContainer>
              <Details className="timeline-content">
                <Company>{exp.company}</Company>
                <Role>{exp.role}</Role>
              </Details>
            </TimelineItem>
          );
        })}
      </TimelineContainer>
    </Container>
  );
};

export default Experience;
