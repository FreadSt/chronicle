import {FC} from "react";
import {NAVBAR_TABS} from "../../../lib/stakeConstants/globalConsts";
import {Discord} from "../../icons/icons";

export const Navbar: FC = () => {
	return(
		<main>
			<article className="flex gap-[30px]">
				{NAVBAR_TABS.map((tab, i) =>
						<span key={i} className="focus:opacity-100 opacity-30">{tab}</span>
					)
				}
				<Discord />
			</article>
		</main>
	)
}
