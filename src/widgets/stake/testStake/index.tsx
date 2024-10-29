import React, { FC, useEffect, useRef, useState } from "react";
import { useWeb3 } from "../../../hooks/useWeb3";
import { poolRewardDetails, stakingAddress, sepXNLTokenAddress, stakingABI, sepXNLABI } from "../../../lib/stakeConstants/globalConsts";
import Web3 from "web3";
import {Button} from "../../../components/button/button";
import {clsx} from "clsx";
import styles from './style.module.scss';
import {CustomDropdown} from "../../../components/customDropdown/dropdown";
import xnl from '../../../assets/images/stake/xnl-logo.svg';
import {OVERVIEW_STATS} from "../../../lib/stakeConstants/constants";
import Tabs from "../../../components/tabs/tabs";
import info from "../../../assets/images/stake/circle-info.svg";
import {ConnectButton} from "@rainbow-me/rainbowkit";

export const TestStake: FC = () => {

	const isMobile = window.innerWidth <= 430;

	let { web3, userAccount, sepXNLToken, stakingContract } = useWeb3();

	const statusRef = useRef<HTMLDivElement | null>(null);
	const userAccountRef = useRef<string | null>(userAccount);

	const [stakedAmount, setStakedAmount] = useState<string>("0");
	const [unstakedAmount, setUnstakedAmount] = useState<string>("0");
	const [rewardAmount, setRewardAmount] = useState<string>("0");
	const [balanceAmount, setBalanceAmount] = useState<string>("0");
	const [totalStakedAmount, setTotalStakedAmount] = useState<string>("0");
	const [apy, setApy] = useState<string>("0%");
	const [currentPrice, setCurrentPrice] = useState<string>("$0.00");
	const [selectedPool, setSelectedPool] = useState<number>(1);
	const [stakeInput, setStakeInput] = useState<string>("");
	const [unstakeInput, setUnstakeInput] = useState<string>("");

	const fetchCurrentXNLPrice = async () => {
		try {
			const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=chronicle&vs_currencies=usd');
			const data = await response.json();
			const price = data.chronicle.usd;
			setCurrentPrice(`$${price}`);
			return price;
		} catch (error) {
			console.error("Error fetching price:", error);
			return 0;
		}
	};

	function updateContracts() {
		// Use selectedPool directly instead of accessing poolSelectRef
		if (web3) {
			const stakingContract = new web3.eth.Contract(stakingABI, stakingAddress);
			const sepXNLToken = new web3.eth.Contract(sepXNLABI, sepXNLTokenAddress);
			console.log("Staking Contract:", stakingContract);
			console.log("sepXNL Token Contract:", sepXNLToken);
		}
	}

	const handleDropdownChange = (value: number) => {
		setSelectedPool(value);
		updateContracts(); // Update your contracts based on selected pool
		updateStakedAndRewards(); // Fetch the updated staked and reward data
	};

	const fetchRewardTokenPrice = async (coinGeckoId: string) => {
		try {
			const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=usd`);
			const data = await response.json();
			return data[coinGeckoId].usd;
		} catch (error) {
			console.error("Error fetching reward token price:", error);
			return 0;
		}
	};

	const calculateAPY = (totalStaked: number, dailyReward: number | null, rewardTokenPrice: number | null, stakedTokenPrice: number) => {
		// @ts-ignore
		const annualReward = dailyReward * rewardTokenPrice * 365;
		const totalStakedValue = totalStaked * stakedTokenPrice;

		if (totalStakedValue === 0) {
			setApy("0%");
			return;
		}

		const apyValue = (annualReward / totalStakedValue) * 100;
		setApy(`${apyValue.toFixed(2)}%`);
	};

	const updateStakedAndRewards = async () => {
		try {
			console.log(`Fetching data for pool ID: ${selectedPool}`);
			console.log(`User Account: ${userAccount}`);

			const staked = await stakingContract.methods.userStaked(selectedPool, userAccount).call();
			const rewards = await stakingContract.methods.earned(selectedPool, userAccount).call();

			const pool = await stakingContract.methods.pools(selectedPool).call();
			const totalStaked = pool.totalStaked;
			const rewardTokenAddress = pool.rewardToken;

			if(web3){
				const rewardToken = new web3.eth.Contract(sepXNLABI, rewardTokenAddress );
				let rewardTokenSymbol = await rewardToken.methods.symbol().call();
				const dailyReward = poolRewardDetails[selectedPool].dailyReward;
				let rewardTokenPrice = poolRewardDetails[selectedPool].price;
				if (poolRewardDetails[selectedPool].coinGeckoId) {
					rewardTokenPrice = await fetchRewardTokenPrice(poolRewardDetails[selectedPool].coinGeckoId);
				}
				const stakedTokenPrice = await fetchRewardTokenPrice('chronicle');
				setStakedAmount(`${web3.utils.fromWei(staked, 'ether')}`);
				setRewardAmount(`${web3.utils.fromWei(rewards, 'ether')} ${rewardTokenSymbol}`);
				setTotalStakedAmount(`${web3.utils.fromWei(totalStaked, 'ether')} sepXNL`);
				calculateAPY(parseFloat(web3.utils.fromWei(totalStaked, 'ether')), dailyReward, rewardTokenPrice, stakedTokenPrice);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const updateUserBalance = async () => {
		try {
			if(web3){
				const balance = await sepXNLToken.methods.balanceOf(userAccount).call();
				setBalanceAmount(`${web3.utils.fromWei(balance, 'ether')} sepXNL`);
			}
		} catch (error) {
			console.error("Error fetching balance:", error);
		}
	};

	const stakeTokens = async () => {
		if(web3){
			const amountInWei = web3.utils.toWei(stakeInput, 'ether');
			try {
				const allowance = await sepXNLToken.methods.allowance(userAccount, stakingAddress).call();
				if (parseFloat(allowance) < parseFloat(amountInWei)) {
					await sepXNLToken.methods.approve(stakingAddress, amountInWei).send({ from: userAccount });
					alert(`Approved ${stakeInput} sepXNL for staking.`);
				}

				await stakingContract.methods.stake(selectedPool, amountInWei).send({ from: userAccount });
				updateStakedAndRewards();
				updateUserBalance();
			} catch (error) {
				console.error("Staking failed:", error);
			}
		}
	};

	const unstakeTokens = async () => {
		if(web3){
			const amountInWei = web3.utils.toWei(unstakeInput, 'ether');

			try {
				await stakingContract.methods.unstake(selectedPool, amountInWei).send({ from: userAccount });
				updateStakedAndRewards();
				updateUserBalance();
			} catch (error) {
				console.error("Unstaking failed:", error);
			}
		}
	};

	const claimRewards = async () => {
		try {
			await stakingContract.methods.claimReward(selectedPool).send({ from: userAccount });
			updateStakedAndRewards();
			updateUserBalance();
		} catch (error) {
			console.error("Claiming rewards failed:", error);
		}
	};

	useEffect(() => {
		fetchCurrentXNLPrice();
		updateStakedAndRewards();
	}, [selectedPool]);

	const connectWallet = async () => {
		if (window.ethereum) {
			try {
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const web3Instance = new Web3(window.ethereum);
				const accounts = await web3Instance.eth.getAccounts();
				userAccountRef.current = accounts[0];
				statusRef.current!.innerText = `Connected: ${userAccountRef.current}`;
				updateContracts();
				updateStakedAndRewards();
				updateUserBalance();
				fetchCurrentXNLPrice();
			} catch (error) {
				console.error(error);
				statusRef.current!.innerText = "Error connecting to MetaMask.";
			}
		} else {
			statusRef.current!.innerText = "Please install MetaMask.";
		}
	};

	const options = [
		{ label: "Stake sepXNL for sepUSD", value: 1 },
		{ label: "Stake sepXNL for wXNL", value: 2 },
	];

	const handleMaxStake = async () => {
		if (web3){
			try {
				const balance = await sepXNLToken.methods.balanceOf(userAccount).call();
				setStakedAmount(web3.utils.fromWei(balance, 'ether'));
			} catch (error) {
				console.error("Error fetching max stake amount:", error);
			}
		}
	};

	const handleMaxUnstake = async () => {
		if(web3){
			try {
				const staked = await stakingContract.methods.userStaked(selectedPool, userAccount).call();
				setUnstakedAmount(web3.utils.fromWei(staked, 'ether'));
			} catch (error) {
				console.error("Error fetching max unstake amount:", error);
			}
		}
	};

	const tabs = [
		{
			label: "Stake",
			content:
				<div className="flex flex-col items-center justify-between gap-[20px]">
					<aside className="w-full flex flex-col gap-[20px] bg-box-bg p-[20px]">
						<div className="flex justify-between items-center">
							<span className="text-[12px] opacity-50">Amount</span>
							<aside className="flex items-center gap-[10px]">
								<span className="flex items-center text-[12px] opacity-50">Balance:{balanceAmount}</span>
								<Button onClick={handleMaxStake}>Max</Button>
							</aside>
						</div>

						<div className="flex items-center gap-[10px] w-full justify-between">
							<aside className="flex justify-between gap-[10px]">
								<img src={xnl}/>
								<p className="uppercase text-[16px]">XNL</p>
							</aside>
							<input
								type="text"
								value={stakedAmount}
								onChange={(e) => setStakedAmount(e.target.value)}
								className="text-right w-[100px] bg-app-widget-dark"
							/>
							{/*<p>{stakedAmount}</p>*/}
						</div>
					</aside>

					<aside className="w-full flex flex-col gap-[20px] bg-box-bg p-[20px]">

						<div className={clsx("flex justify-between items-center", styles.stakepool)}>
							<aside className="flex flex-col">
								<div className="flex flex-col gap-[10px]">
									<span className="text-[12px] opacity-50">Staking pool</span>
									<CustomDropdown
										options={options}
										selectedValue={selectedPool}
										onChange={handleDropdownChange}
									/>
								</div>
							</aside>
							<aside className="flex flex-col gap-[10px]">
								<span className="text-[12px] opacity-50">XNL staked</span>
								<p className="text-[1.4rem]">{totalStakedAmount}</p>
							</aside>
							<aside className="flex flex-col items-center gap-[10px] justify-between">
								<div className="flex items-center gap-[10px]">
									<span className="flex items-center text-[12px] opacity-50">APY</span>
									<img src={info} alt=""/>
								</div>
								<p>{apy}</p>
							</aside>
						</div>
					</aside>
					<Button onClick={stakeTokens} className="w-full">Stake</Button>
				</div>,
		},
		{
			label: "Unstake",
			content:
				<div className="flex flex-col items-center justify-between gap-[20px]">
					<aside className="w-full flex flex-col gap-[20px] bg-box-bg p-[20px]">
						<div className={clsx("flex justify-between items-center", styles.unstake)}>
							<aside className="flex flex-col">
								<div className="flex flex-col gap-[10px]">
									<span className="text-[12px] opacity-50">Staking pool</span>
									<CustomDropdown
										options={options}
										selectedValue={selectedPool}
										onChange={handleDropdownChange}
									/>
								</div>
							</aside>

							<aside className="flex flex-col gap-[10px]">
								<div className="flex items-center gap-[10px]">
									<span className="flex items-center text-[12px] opacity-50">Balance: {balanceAmount}</span>
									<Button onClick={handleMaxUnstake}>Max</Button>
								</div>
								<input
									type="text"
									value={unstakedAmount}
									onChange={(e) => setUnstakedAmount(e.target.value)}
									className="text-right w-[100px] bg-app-widget-dark"
								/>
								{/*<p className="text-end">0.00</p>*/}
							</aside>
						</div>

					</aside>
					<Button onClick={unstakeTokens} className="w-full">Unstake</Button>
				</div>,
		},
	];

	return (
		<main className={clsx("flex gap-[20px] pt-[2.77rem]", styles.main)}>
			{
				isMobile &&
				<div className={styles.connectRainbow}>
          <ConnectButton />
				</div>
			}
			<div className={clsx("flex w-2/3 flex-col gap-[20px]", styles.overview)}>
				<article className="w-full bg-box-bg p-[20px] box-border text-[24px]">
					<h3>Overview</h3>
					<div className={clsx('my-[20px]', styles.line)}/>
					<section className={clsx("flex", styles.statsoverview)}>
						{OVERVIEW_STATS.map((stat, i) => (
							<div key={i} className={clsx("w-[10.27rem] flex flex-col gap-[15px]", styles.statsoverviewMobile)}>
						<span className="opacity-50 text-[12px]">
							{stat}
						</span>
								{stat === "XNL Price" ? (
									<p className="text-[16px]">
										{currentPrice !== null ? `${currentPrice}` : 'Fetching price...'}
									</p>
								) : null}
							</div>
						))}
					</section>
				</article>
				<div className={clsx("flex flex-col gap-[20px] bg-box-bg p-[20px]", styles.supplies)}>
					<h2 className="text-[1.6rem]">My supplies</h2>
					<div className={styles.line}/>
					{/*here's pool of XNL below, add more if u need and pass vars*/}
					<section
						className={clsx("flex items-center gap-[50px] bg-app-widget-dark px-[10px] py-[20px] box-border justify-between")}>
						<div className="flex items-center gap-[10px]">
							<img src={xnl} alt="xnl"/>
							<p>XNL</p>
						</div>
						<div className={styles.supplystat}>
							<p className="opacity-50">My stake</p>
							<h3>{totalStakedAmount}</h3>
						</div>
						<div className={styles.supplystat}>
							<p className="opacity-50">APY</p>
							<h3>{apy}</h3>
						</div>
						<div className={styles.supplystat}>
							<p className="opacity-50">Claimable reward</p>
							<h3>{rewardAmount}</h3>
						</div>
						<Button onClick={claimRewards}>Claim</Button>
					</section>
				</div>
			</div>

			<div className={clsx("flex flex-col w-1/3", styles.stakexnl)}>
				<article className="w-full bg-box-bg p-[20px] box-border text-[24px]">
					<div className="flex items-center justify-between">
						<h3>Stake XNL</h3>
					</div>
					<div className={clsx('my-[20px]', styles.line)}/>
					<section className="flex justify-between">
						<span className="text-[14px] opacity-50">Total XNL staked across all pools</span>
						<p className="text-[14px]">{totalStakedAmount}</p>
					</section>
					<article className="py-[20px]">
						<Tabs tabs={tabs}/>
					</article>
				</article>
			</div>
		</main>
	);
};
