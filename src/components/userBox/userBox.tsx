import {FC} from "react";
import {ArrDown, Bell} from "../icons/icons";
import avatar from '../../assets/images/stake/avatar.png';

export const UserBox: FC = () => {
	return(
		<aside className="flex gap-[10px] items-center">
			<Bell className="cursor-pointer"/>
			<article className="flex items-center bg-box-bg pr-[10px]">
				<span className="flex mx-[10px] gap-[10px] text-app-purple">USDC<p className="text-app-white">10203</p></span>
				<span className="flex gap-[10px] text-app-aqua">XNL<p className="text-app-white">0.00</p></span>
				<section className="flex items-center">
					<img src={avatar} alt="user-avatar" className="w-[2.22rem] mx-[10px]"/>
					<ArrDown />
				</section>
			</article>
		</aside>
	)
}
