import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  color: #333;
  font-family: Arial, sans-serif;
  text-align: center;
`;

const ErrorMessage = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Error = () => {
    return (
        <ErrorContainer>
            <ErrorMessage>Oops! This Page Doesn't Exist</ErrorMessage>
            <ErrorDescription>
                We're sorry, but the page you were looking for doesn't exist. It might have been removed, renamed, or didn't exist in the first place.
            </ErrorDescription>
            <HomeButton to="/">Go Back to Home</HomeButton>
        </ErrorContainer>
    );
};

export default Error;
