import {FC} from "react";
import {clsx} from "clsx";
import styles from './style.module.scss';
import {Button} from "../../../components/button/button";
import {OVERVIEW_STATS, SUPPLIES_STATS} from "../../../lib/stakeConstants/constants";

export const Supplies: FC = () => {
	return(
		<article className="w-full bg-box-bg p-[20px] box-border text-[24px]">
			<div className="flex items-center justify-between">
				<h3>My supplies</h3>
			</div>
			<div className={clsx('my-[20px]', styles.line)}/>
			<section className="flex flex-col gap-[10px]">
				{SUPPLIES_STATS.map((stat, i) => {
					return(
						<div key={i} className="flex items-center justify-between py-[10px] px-[20px] bg-box-bg">
							<article className="flex items-center gap-[4rem]">
								<aside className="flex items-center gap-[10px] w-[150px]">
									<img src={stat.icon} alt="stat-supply"/>
									<span>{stat.name}</span>
								</aside>
								<aside className="w-130px">
									<span className="text-[12px] opacity-50">My stake</span>
									<p>{stat.stake}</p>
								</aside>
								<aside className="w-130px">
									<span className="text-[12px] opacity-50">APY</span>
									<p>{stat.APY}</p>
								</aside>
								<aside className="w-130px">
									<span className="text-[12px] opacity-50">Claimable reward</span>
									<p>{stat.reward}</p>
								</aside>
							</article>
							<Button className="w-[137px] h-[32px] flex items-center justify-center">
								Claim
							</Button>
						</div>
					)
				})}
			</section>
		</article>
	)
}
