import React, { FC, useEffect, useState } from "react";
import { clsx } from "clsx";
import styles from './CustomDropdown.module.scss';

interface Option {
	label: string;
	value: number;
}

interface CustomDropdownProps {
	options: Option[];
	selectedValue: number;
	onChange: (value: number) => void;
}

export const CustomDropdown: FC<CustomDropdownProps> = ({ options, selectedValue, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOptionClick = (value: number) => {
		onChange(value);
		setIsOpen(false);
	};

	return (
		<div className={clsx("max-w-[9.23rem]", styles.dropdown)}>
			<div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
				{options.find(option => option.value === selectedValue)?.label || "Select a pool"}
			</div>
			{isOpen && (
				<div className={styles.options}>
					{options.map(option => (
						<div
							key={option.value}
							className={clsx(styles.option, { [styles.selected]: option.value === selectedValue })}
							onClick={() => handleOptionClick(option.value)}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
