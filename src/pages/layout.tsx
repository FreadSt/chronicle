import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import styles from "./layout.module.scss";
import {TestStake} from "../widgets/stake/testStake";
import { WagmiProvider, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {sepolia} from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'

import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'Chronicle',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
})

const queryClient = new QueryClient()


export const Layout = () => {
  const isMobile = window.innerWidth <= 430;
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="min-h-screen flex flex-col px-[30px]">
            <Header/>
            <div className="flex-grow">
              <Router>
                <Routes>
                  <Route path="/" element={<TestStake/>}/>
                </Routes>
              </Router>
            </div>
            <div className="">
              <div className={styles.line}/>
            </div>
            <Footer/>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
