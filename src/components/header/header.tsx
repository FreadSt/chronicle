import React from 'react';
import {ChronicleLogo} from "../icons/icons";
import {Navbar} from "./navbar/navbar";
import {UserBox} from "../userBox/userBox";

export const Header: React.FC = () => {
	return (
		<header className="h-[5rem] py-[20px] flex items-center justify-between">
			<aside className="flex items-end gap-[5px]">
				<ChronicleLogo />
				<p className="uppercase opacity-30 mt-[]">beta</p>
			</aside>
			<div className="flex items-center gap-[50px]">
				<Navbar />
				<UserBox />
			</div>
		</header>
	);
};

