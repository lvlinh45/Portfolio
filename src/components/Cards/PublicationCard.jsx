import React from "react";
import styled from "styled-components";

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Span = styled.span`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Card = styled.div`
  width: 650px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
  @media only screen and (max-width: 768px) {
    padding: 10px;
    gap: 8px;
    width: 300px;
  }

  &:hover ${Span} {
    overflow: visible;
    -webkit-line-clamp: unset;
  }

  border: 0.1px solid #306ee8;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Conference = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Detail = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-top: 4px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const UrlLink = styled.a`
  font-size: 14px;
  color: #306ee8;
  text-decoration: none;
  word-break: break-all;
  &:hover {
    text-decoration: underline;
  }
`;

const PublicationCard = ({ publication }) => {
  return (
    <Card>
      <Top>
        <Body>
          <Title>{publication.title}</Title>
          <Conference>{publication.conference}</Conference>
          <Date>{publication.date} | {publication.type}</Date>
        </Body>
      </Top>
      <Description>
        <Detail><b>Translated Title:</b> {publication.translatedTitle}</Detail>
        <Detail><b>Role:</b> {publication.role}</Detail>
        <Detail><b>ISBN:</b> {publication.isbn}</Detail>
        <Detail><b>Contributors:</b> {publication.contributors}</Detail>
        {publication.url && (
          <Detail>
            <b>URL:</b> <UrlLink href={publication.url} target="_blank" rel="noopener noreferrer">{publication.url}</UrlLink>
          </Detail>
        )}
      </Description>
    </Card>
  );
};

export default PublicationCard;
