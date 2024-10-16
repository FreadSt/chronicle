import { useState, useEffect } from "react";
import Web3 from "web3";
import { sepXNLABI, sepXNLTokenAddress, stakingABI, stakingAddress } from "../lib/stakeConstants/globalConsts";

interface UseWeb3Return {
	web3: Web3 | null;
	userAccount: string | null;
	sepXNLToken: any | null;
	stakingContract: any | null;
}

export const useWeb3 = (): UseWeb3Return => {
	const [web3, setWeb3] = useState<Web3 | null>(null);
	const [userAccount, setUserAccount] = useState<string | null>(null);
	const [sepXNLToken, setSepXNLToken] = useState<any | null>(null);
	const [stakingContract, setStakingContract] = useState<any | null>(null);

	useEffect(() => {
		const initWeb3 = async () => {
			try {
				if (window.ethereum) {
					const web3Instance = new Web3(window.ethereum);
					setWeb3(web3Instance);

					const accounts: any = await window.ethereum.request({
						method: "eth_requestAccounts",
					});

					setUserAccount(accounts[0]);

					const sepXNLTokenInstance = new web3Instance.eth.Contract(
						sepXNLABI,
						sepXNLTokenAddress
					);

					setSepXNLToken(sepXNLTokenInstance);

					const stakingContractInstance = new web3Instance.eth.Contract(
						stakingABI,
						stakingAddress
					);
					setStakingContract(stakingContractInstance);
				} else {
					console.error("Ethereum provider not found. Please install MetaMask.");
				}
			} catch (error) {
				console.error("Error initializing Web3: ", error);
			}
		};

		initWeb3();
	}, []);

	return {
		web3,
		userAccount,
		sepXNLToken,
		stakingContract,
	};
};
