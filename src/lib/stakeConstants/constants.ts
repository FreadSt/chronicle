import xnl from '../../assets/images/stake/xnl-logo.svg';
import usdc from '../../assets/images/stake/usdc.svg';
import thor from '../../assets/images/stake/thor.svg';

export const OVERVIEW_STATS = [
	"My staked balance", "Lifetime rewards", "Time in pool", "Claimable rewards", "XNL Price"
]

export const SUPPLIES_STATS = [
	{
		name: "THOR",
		icon: thor,
		stake: "50 XNL",
		APY: "12%",
		reward: "50.00 THOR",
	},
	{
		name: "USDC",
		icon: usdc,
		stake: "50 XNL",
		APY: "9%",
		reward: "50.00 USDC",
	},
	{
		name: "XNL",
		icon: xnl,
		stake: "50 XNL",
		APY: "5%",
		reward: "50.00 XNL",
	},
]
