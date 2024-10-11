import {FC} from "react";
import {clsx} from "clsx";
import styles from './style.module.scss';
import {Button} from "../../../components/button/button";
import {OVERVIEW_STATS} from "../../../lib/stakeConstants/constants";

export const Supplies: FC = () => {
	return(
		<article className="w-full bg-box-bg p-[20px] box-border text-[24px]">
			<div className="flex items-center justify-between">
				<h3>My supplies</h3>
				<Button className="w-[137px]">
					Connect
				</Button>
			</div>
			<div className={clsx('my-[20px]', styles.line)}/>
			<section className="flex">
				{OVERVIEW_STATS.map((stat, i) => {
					return (
						<div key={i} className="w-[10.27rem]">
							<span className="opacity-50 text-[12px]">{stat}</span>
						</div>
					)
				})
				}
				<div className="h-[70px]"/>
			</section>
		</article>
	)
}
