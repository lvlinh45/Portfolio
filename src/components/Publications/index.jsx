import React from "react";
import styled from "styled-components";
import { usePortfolioData } from "../../context/PortfolioContext";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
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

const OrcidContainer = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.card};
  border: 1px solid #a6e22e;
  border-radius: 20px;
  padding: 6px 14px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  align-self: flex-start;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(166, 226, 46, 0.08);
  
  &:hover {
    background: #a6e22e10;
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(166, 226, 46, 0.25);
  }
`;

const OrcidIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const PublicationItem = styled(motion.div)`
  display: flex;
  gap: 24px;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Year = styled.div`
  width: 250px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  flex-shrink: 0;
  white-space: nowrap;
  @media (max-width: 768px) {
    margin-bottom: 10px;
    width: auto;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PubTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.4;
  text-transform: uppercase;
`;

const PubTranslatedTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  font-style: italic;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.4;
`;

const PubMeta = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
  line-height: 1.5;
`;

const MetaItem = styled.div`
  span {
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Links = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const DemoButton = styled.a`
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
  align-self: flex-start;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(133, 76, 230, 0.6);
    filter: brightness(1.1);
  }
`;

const Publications = () => {
  const { publications } = usePortfolioData();

  return (
    <Container
      id="publications"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Header>Publications</Header>
      <OrcidContainer href="https://orcid.org/0009-0004-8961-4507" target="_blank" rel="noopener noreferrer">
        <OrcidIcon src="https://orcid.org/assets/vectors/orcid.logo.icon.svg" alt="ORCID" />
        <span>ORCID: 0009-0004-8961-4507</span>
      </OrcidContainer>
      {publications.map((pub, index) => (
        <PublicationItem
          key={index}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <Year>{pub.date} | {pub.type}</Year>
          <Details>
            <PubTitle>{pub.title}</PubTitle>
            {pub.translatedTitle && (
              <PubTranslatedTitle>{pub.translatedTitle}</PubTranslatedTitle>
            )}
            <PubMeta>
              {pub.conference && <MetaItem><span>Conference:</span> {pub.conference}</MetaItem>}
              {pub.role && <MetaItem><span>Role:</span> {pub.role}</MetaItem>}
              {pub.isbn && pub.isbn !== "xxx-xxx-xxx-xxx-x" && <MetaItem><span>ISBN:</span> {pub.isbn}</MetaItem>}
              {pub.doi && (
                <MetaItem>
                  <span>DOI:</span>{" "}
                  <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" style={{ color: "#306ee8", textDecoration: "none" }}>
                    {pub.doi}
                  </a>
                </MetaItem>
              )}
              {pub.contributors && <MetaItem><span>Contributors:</span> {pub.contributors}</MetaItem>}
            </PubMeta>
            {pub.url && (
              <Links>
                <DemoButton href={pub.url} target="_blank" rel="noopener noreferrer">
                  View Publication
                </DemoButton>
              </Links>
            )}
          </Details>
        </PublicationItem>
      ))}
    </Container>
  );
};

export default Publications;
