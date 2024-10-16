import { FC, useEffect, useState } from "react";
import { clsx } from "clsx";
import styles from './style.module.scss';
import { Button } from "../../../components/button/button";
import { OVERVIEW_STATS } from "../../../lib/stakeConstants/constants";

export const Overview: FC = () => {
	const [xnlPrice, setXnlPrice] = useState<number | null>(null);

	const fetchCurrentXNLPrice = async () => {
		try {
			const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=chronicle&vs_currencies=usd');
			const data = await response.json();
			const price = data.chronicle.usd;
			setXnlPrice(price); // Store the fetched price in state
		} catch (error) {
			console.error("Error fetching price:", error);
		}
	};

	useEffect(() => {
		fetchCurrentXNLPrice();
	}, []);

	return (
		<article className="w-full bg-box-bg p-[20px] box-border text-[24px]">
			<div className="flex items-center justify-between">
				<h3>Overview</h3>
				<Button className="w-[137px]">
					Connect
				</Button>
			</div>
			<div className={clsx('my-[20px]', styles.line)} />
			<section className="flex">
				{OVERVIEW_STATS.map((stat, i) => (
					<div key={i} className="w-[10.27rem] flex flex-col gap-[15px]">
						<span className="opacity-50 text-[12px]">
							{stat}
						</span>
						{stat === "XNL Price" ? (
							<p className="text-[16px]">
								{xnlPrice !== null ? `$${xnlPrice}` : 'Fetching price...'}
							</p>
						) : null}
					</div>
				))}
			</section>
		</article>
	);
};
