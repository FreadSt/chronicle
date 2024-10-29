import React, {useEffect} from 'react';
import {ChronicleLogo} from "../icons/icons";
import {Navbar} from "./navbar/navbar";
import {UserBox} from "../userBox/userBox";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import menu from '../../assets/images/stake/burger.svg';
import './header.module.scss'

export const Header: React.FC = () => {
	const isMobile = window.innerWidth <= 430;
	return (
		<header className="h-[5rem] py-[20px] flex items-center justify-between">
			<aside className="flex items-end gap-[5px]">
				<ChronicleLogo />
				<p className="uppercase opacity-30 mt-[]">beta</p>
			</aside>
			{
				isMobile && <img src={menu} alt="mobile-menu"/>
			}
			<div className="flex items-center gap-[50px]">
				<ConnectButton/>
				<Navbar/>
				<UserBox/>
			</div>
		</header>
	);
};

