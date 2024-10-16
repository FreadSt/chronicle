import React from 'react';
import Stake from './stake/stake';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import styles from "./layout.module.scss";
import {TestStake} from "../widgets/stake/testStake";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col px-[30px]">
      <Header />
      <div className="flex-grow">
        <Router>
          <Routes>
            <Route path="/" element={<TestStake />} />
          </Routes>
        </Router>
      </div>
      <div className="">
        <div className={styles.line}/>
      </div>
      <Footer/>
    </div>
  );
};
