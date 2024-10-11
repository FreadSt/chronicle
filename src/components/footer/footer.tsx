import React from 'react';
import {ChronicleLogo, Medium, Telegram, Twitter} from "../icons/icons";
import styles from "./footer.module.scss";
import {clsx} from "clsx";

export const Footer: React.FC = () => {
	return (
		<footer className={clsx("h-[13.26rem] py-[20px] flex flex-col justify-between", styles.footer)}>
			<ChronicleLogo/>
			<div className="flex flex-col">
				<a href="#" className="cursor-pointer decoration-[none]">contact@chronicle.io</a>
				<span className="opacity-50">Chronicle © 2021. All rights reserved.</span>
			</div>
			<section className="flex justify-between">
				<div className="flex gap-[20px]">
					<a href="#" className="opacity-50">Terms of use</a>
					<a href="#" className="opacity-50">Privacy policy</a>
				</div>
				<aside className="flex gap-[10px]">
					<Twitter/>
					<Telegram/>
					<Medium/>
				</aside>
			</section>
		</footer>
	);
};

