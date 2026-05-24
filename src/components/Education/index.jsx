import React from "react";
import styled from "styled-components";
import { education } from "../../data/constants";

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

const EducationItem = styled.div`
  display: flex;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Year = styled.div`
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  flex-shrink: 0;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const School = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Degree = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;

const Field = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Thesis = styled.div`
  font-size: 15px;
  font-style: italic;
  color: ${({ theme }) => theme.text_secondary};
`;

const Education = () => {
  return (
    <Container id="education">
      <Header>Education</Header>
      {education.map((edu, index) => {
        return (
          <EducationItem key={index}>
            <Year>{edu.date}</Year>
            <Details>
              <School>{edu.school}</School>
              <Degree>{edu.degree}</Degree>
              {/* {edu.fieldOfStudy && <Field>Field of study: {edu.fieldOfStudy}</Field>} */}
              {edu.thesis && <Thesis>Thesis: {edu.thesis}</Thesis>}
            </Details>
          </EducationItem>
        );
      })}
    </Container>
  );
};

export default Education;
