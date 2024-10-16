import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import store from "./store/store";
import {Provider} from "react-redux";
import { MetaMaskProvider } from "@metamask/sdk-react"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          dappMetadata: {
            name: "Chronicle",
            url: window.location.href,
          },
          infuraAPIKey: process.env.INFURA_API_KEY,
        }}
      >
        <App />
      </MetaMaskProvider>
    </React.StrictMode>
  </Provider>
);
