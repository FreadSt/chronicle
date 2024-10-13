import {FC} from "react";
import {clsx} from "clsx";
import styles from './style.module.scss';
import {Button} from "../../../components/button/button";
import Tabs from "../../../components/tabs/tabs";
import xnl from '../../../assets/images/stake/xnl-logo.svg';
import thor from '../../../assets/images/stake/thor.svg';
import info from '../../../assets/images/stake/circle-info.svg';
import arr from '../../../assets/images/stake/Chevron Down.svg';

const tabs = [
	{
		label: "Stake",
		content:
			<div className="flex flex-col items-center justify-between gap-[20px]">

				<aside className="w-full flex flex-col gap-[20px] bg-box-bg p-[20px]">
					<div className="flex justify-between items-center">
						<span className="text-[12px] opacity-50">Amount</span>
						<aside className="flex items-center gap-[10px]">
							<span className="flex items-center text-[12px] opacity-50">Balance: 540 54</span>
							<div className="text-[10px] bg-app-purple h-[17px] opacity-100 px-[10px]">max</div>
						</aside>
					</div>

					<div className="flex items-center gap-[10px] w-full justify-between">
						<aside className="flex justify-between">
							<img src={xnl}/>
							<p className="uppercase text-[16px]">xnl</p>
						</aside>
						<p>0.00</p>
					</div>
				</aside>

				<aside className="w-full flex flex-col gap-[20px] bg-box-bg p-[20px]">

					<div className="flex justify-between items-center">
						<aside className="flex flex-col">
							<div className="flex flex-col gap-[10px]">
								<span className="text-[12px] opacity-50">Staking pool</span>
								<aside className="flex gap-[10px] items-center">
									<img src={thor} alt="coin"/>
									<p>Thor</p>
									<img src={arr} alt="coin"/>
								</aside>
							</div>
						</aside>
						<aside className="flex flex-col gap-[10px]">
							<span className="text-[12px] opacity-50">XNL staked</span>
							<p>1.25 M</p>
						</aside>
						<aside className="flex flex-col items-center gap-[10px] justify-between">
							<div className="flex items-center gap-[10px]">
								<span className="flex items-center text-[12px] opacity-50">APY</span>
								<img src={info} alt=""/>
							</div>
							<p>12%</p>
						</aside>
					</div>

				</aside>

			</div>,
	},
	{
		label: "Unstake",
		content:
			<div className="flex flex-col items-center justify-between gap-[20px]">
				<aside className="w-full flex flex-col gap-[20px] bg-box-bg p-[20px]">
					<div className="flex justify-between items-center">
						<aside className="flex flex-col">
							<div className="flex flex-col gap-[10px]">
								<span className="text-[12px] opacity-50">Staking pool</span>
								<aside className="flex gap-[10px] items-center">
									<img src={thor} alt="coin"/>
									<p>Thor</p>
									<img src={arr} alt="coin"/>
								</aside>
							</div>
						</aside>

						<aside className="flex flex-col gap-[10px]">
							<div className="flex items-center gap-[10px]">
								<span className="flex items-center text-[12px] opacity-50">Balance: 540 54</span>
								<div className="text-[10px] bg-app-purple h-[17px] opacity-100 px-[10px]">max</div>
							</div>
							<p className="text-end">0.00</p>
						</aside>
					</div>

				</aside>

			</div>,
	},
];


export const StakeXNL: FC = () => {
	return (
		<article className="w-full bg-box-bg p-[20px] box-border text-[24px]">
			<div className="flex items-center justify-between">
				<h3>Stake XNL</h3>
			</div>
			<div className={clsx('my-[20px]', styles.line)}/>
			<section className="flex justify-between">
				<span className="text-[14px] opacity-50">Total XNL staked across all pools</span>
				<p className="text-[14px]">9,941,324 (24%)</p>
			</section>
			<article className="py-[20px]">
				<Tabs tabs={tabs} />
			</article>
			<Button className="w-full">
				Stake
			</Button>
		</article>
	)
}
