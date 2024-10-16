import { FC, useEffect, useState } from "react";
import {poolRewardDetails} from "../lib/stakeConstants/globalConsts";

export const APYCalculator: FC = () => {
	const [apy, setApy] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchTokenPrice = async (coinGeckoId: string): Promise<number | null> => {
		try {
			const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=usd`);
			const data = await response.json();
			return data[coinGeckoId]?.usd || null; // Return the price or null if not found
		} catch (error) {
			console.error("Error fetching price:", error);
			return null;
		}
	};

	const calculateAPY = async () => {
		const totalStaked = 100_000;

		const rewards = await Promise.all(
			Object.values(poolRewardDetails).map(async (reward) => {
				if (reward.price === null) {
					const price = await fetchTokenPrice(reward.coinGeckoId);
					return { ...reward, price };
				}
				return reward;
			})
		);

		rewards.forEach((reward) => {
			const { dailyReward, price } = reward;
			// @ts-ignore
			const annualReward = dailyReward * price * 365;

			// @ts-ignore
			const totalStakedValue = totalStaked * reward.price;

			if (totalStakedValue === 0) {
				setApy(0);
				setLoading(false);
				return;
			}

			const apyValue = (annualReward / totalStakedValue) * 100;
			setApy(apyValue);
		});

		setLoading(false);
	};

	useEffect(() => {
		calculateAPY();
	}, []);

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : (
				<p>{apy !== null ? `${apy.toFixed(2)}%` : "Unable to calculate"}</p>
			)}
		</div>
	);
};
