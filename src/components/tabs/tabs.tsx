import React, { useState } from "react";

interface TabProps {
	label: string;
	content: React.ReactNode;
}

interface TabsProps {
	tabs: TabProps[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState<number>(0);

	return (
		<div className="w-full">
			<div className="flex border-b border-app-widget-dark">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`px-4 py-2 text-sm font-medium w-full text-center ${
							activeTab === index
								? "border-b-2 border-app-purple text-white"
								: "text-app-grey"
						}`}
						onClick={() => setActiveTab(index)}
					>
						{tab.label}
					</button>
				))}
			</div>

			<div className="mt-4">
				{tabs.map((tab, index) => (
					<div
						key={index}
						className={`${activeTab === index ? "block" : "hidden"}`}
					>
						{tab.content}
					</div>
				))}
			</div>
		</div>
	);
};

export default Tabs;
