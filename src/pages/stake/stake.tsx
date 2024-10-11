import React from 'react';
import {Overview} from "../../widgets/stake/overview";
import {Supplies} from "../../widgets/stake/supplies";

const Stake = () => {
	return (
		<div className="h-full w-full">
			<aside className="max-w-[56.94rem] flex flex-col gap-[20px]">
				<Overview />
				<Supplies />
			</aside>
		</div>
	);
};

export default Stake;
