import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const IndexStyle = styled.body`
  background-image: url(/pic/nb.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: 0 0;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IndexStyle>
    <App />
  </IndexStyle>,
);
