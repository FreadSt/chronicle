import React from 'react';
import {clsx} from "clsx";

type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
																				 children,
																				 onClick,
																				 className = '',
																				 disabled = false,
																			 }) => {

	return (
		<button
			className={clsx('bg-app-purple text-white text-[14px] font-saatliches-regular tracking-[1.80px] px-[15px] py-[10px] box-border', className)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
