import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
        domain='dev-plne530mii1utjfk.us.auth0.com'
        clientId='5v2X1k3Cmk1Ekc6zDgYu91FjWoV8RvgO'
        redirectUri={window.location.origin}>
        <App />
    </Auth0Provider>
  </BrowserRouter>,
  rootElement
);
