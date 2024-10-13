import React from 'react';
import {Overview} from "../../widgets/stake/overview";
import {Supplies} from "../../widgets/stake/supplies";
import {StakeXNL} from "../../widgets/stake/stakeXNL";

const Stake = () => {
	return (
		<div className="h-full w-full py-[40px] flex gap-[20px]">
			<aside className="w-[56.94rem] flex flex-col gap-[20px]">
				<Overview />
				<Supplies />
			</aside>
			<div className="w-[35%] max-w-[50%]">
				<StakeXNL />
			</div>
		</div>
	);
};

export default Stake;
