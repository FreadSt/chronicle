import { FC, useState, useEffect } from "react";
import { ArrDown, Bell } from "../icons/icons";
import avatar from '../../assets/images/stake/avatar.png';
import { useWeb3 } from "../../hooks/useWeb3"; // Assuming you are using the useWeb3 hook you defined earlier

export const UserBox: FC = () => {
	const { userAccount, sepXNLToken, web3 } = useWeb3(); // Get user account, web3, and token from the custom hook
	const [balance, setBalance] = useState<string>("0.00");
	console.log(balance, 'balance')
	// Function to fetch user balance
	const updateUserBalance = async () => {
		try {
			if (sepXNLToken && userAccount && web3) {
				console.log('Fetching balance for account:', userAccount);
				const balance = await sepXNLToken.methods.balanceOf(userAccount).call();
				console.log('Balance fetched:', balance);
				setBalance(web3.utils.fromWei(balance, 'ether'));
			}
		} catch (error) {
			console.error("Error fetching balance:", error);
		}
	};


	useEffect(() => {
		updateUserBalance(); // Fetch the balance when component mounts or userAccount/sepXNLToken changes
	}, [sepXNLToken, userAccount, web3]);

	return (
		<aside className="flex gap-[10px] items-center">
			<Bell className="cursor-pointer" />
			<article className="flex items-center bg-box-bg pr-[10px]">
        <span className="flex mx-[10px] gap-[10px] text-app-purple">
          USDC<p className="text-app-white">10203</p>
        </span>
				<span className="flex gap-[10px] text-app-aqua">
          XNL<p className="text-app-white">{balance}</p> {/* Display the fetched balance here */}
        </span>
				<section className="flex items-center">
					<img src={avatar} alt="user-avatar" className="w-[2.22rem] mx-[10px]" />
					<ArrDown />
				</section>
			</article>
		</aside>
	);
};
