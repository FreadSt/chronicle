import React, { useEffect, useState } from 'react';
import {useWeb3} from "./useWeb3";
import {sepXNLABI} from "../lib/stakeConstants/globalConsts";
import {APYCalculator} from "../helpers/calculateAPY";

interface Pool {
	id: number;
	name: string;
	description: string;
}

interface CalculateAPYProps {
	totalStaked: number;
	dailyReward: number;
	rewardTokenPrice: number;
	stakedTokenPrice: number;
}

const calculateAPY = ({ totalStaked, dailyReward, rewardTokenPrice, stakedTokenPrice }: CalculateAPYProps): number | null => {
	const annualReward = dailyReward * rewardTokenPrice * 365;
	const totalStakedValue = totalStaked * stakedTokenPrice;

	if (totalStakedValue === 0) {
		return null;
	}

	const apy = (annualReward / totalStakedValue) * 100;
	return apy;
};

export const UpdateStakeAndReward: React.FC = () => {

	const { web3, userAccount, stakingContract } = useWeb3();
	const [selectedPool, setSelectedPool] = useState<number>(1);
	const [stakedAmount, setStakedAmount] = useState<string>('0');
	const [rewardAmount, setRewardAmount] = useState<string>('0');
	const [totalStakedAmount, setTotalStakedAmount] = useState<string>('0');
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [apy, setAPY] = useState<number | null>(null);

	const poolRewardDetails = {
		1: { dailyReward: 100, price: 1, coinGeckoId: 'sepXNL' },
		2: { dailyReward: 50, price: 0.5, coinGeckoId: 'wXNL' },
	};

	const pools: Pool[] = [
		{ id: 1, name: 'Farm #1', description: 'Stake sepXNL for sepUSD' },
		{ id: 2, name: 'Farm #2', description: 'Stake sepXNL for wXNL' },
	];

	const handlePoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedPool(Number(event.target.value));
	};

	const fetchTokenPrice = async (coinGeckoId: string): Promise<number | null> => {
		try {
			const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=usd`);
			const data = await response.json();
			return data[coinGeckoId]?.usd || null;
		} catch (error) {
			console.error("Error fetching price:", error);
			return null;
		}
	};

	const updateStakedAndRewards = async () => {
		setLoading(true);
		setError(null);
		if (!web3 || !stakingContract || !userAccount) {
			setError('Web3 not initialized. Please connect your wallet.');
			setLoading(false);
			return;
		}

		try {
			const staked = await stakingContract.methods.userStaked(selectedPool, userAccount).call();
			const rewards = await stakingContract.methods.earned(selectedPool, userAccount).call();
			const pool = await stakingContract.methods.pools(selectedPool).call();
			const totalStaked = pool.totalStaked;
			// @ts-ignore
			const dailyReward = poolRewardDetails[selectedPool]?.dailyReward || 0;
			// @ts-ignore
			let rewardTokenPrice = poolRewardDetails[selectedPool]?.price || 0;

			// @ts-ignore
			if (poolRewardDetails[selectedPool]?.coinGeckoId) {
				// @ts-ignore
				rewardTokenPrice = await fetchTokenPrice(poolRewardDetails[selectedPool].coinGeckoId);
			}

			const stakedTokenPrice = await fetchTokenPrice('chronicle');

			setStakedAmount(web3.utils.fromWei(staked, 'ether'));
			setRewardAmount(`${web3.utils.fromWei(rewards, 'ether')}`);
			setTotalStakedAmount(web3.utils.fromWei(totalStaked, 'ether'));

			// Calculate APY and update state
			const calculatedAPY = calculateAPY({
				totalStaked: Number(web3.utils.fromWei(totalStaked, 'ether')),
				dailyReward,
				rewardTokenPrice: rewardTokenPrice || 0,
				stakedTokenPrice: stakedTokenPrice || 0,
			});

			setAPY(calculatedAPY);

		} catch (error) {
			console.error('Error fetching data:', error);
			setError('Failed to fetch data.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (userAccount && stakingContract) {
			updateStakedAndRewards();
		}
	}, [userAccount, stakingContract, selectedPool]);

	return (
		<div>
			<select id="farmPoolSelect" value={selectedPool} onChange={handlePoolChange}>
				{pools.map((pool) => (
					<option key={pool.id} value={pool.id}>
						{pool.name}: {pool.description}
					</option>
				))}
			</select>

			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<div>
					<p id="stakedAmount">Staked: {stakedAmount} sepXNL</p>
					<p id="rewardAmount">Rewards: {rewardAmount}</p>
					<p id="totalStakedAmount">Total Staked: {totalStakedAmount} sepXNL</p>
					{apy !== null && <p id="apy">APY: {apy.toFixed(2)}%</p>}
				</div>
			)}
		</div>
	);
};

