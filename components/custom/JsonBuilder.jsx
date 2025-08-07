import React, { useState, useEffect } from "react";
import { Copy, Download } from "lucide-react";

const JsonBuilder = () => {
	const [answers, setAnswers] = useState({
		eventName: "page_default",
		isFirstEvent: true,
		hasPageRefreshed: false,
		brand: "Dickies",
		region: "AUS",
		isLoggedIn: false,
	});

	const [generatedJson, setGeneratedJson] = useState({});

	// Brand/Region configurations
	const brandConfigs = {
		"Dickies-AUS": {
			site: {
				name: "dickies",
				currency: "AUD",
				division: "Dickies",
				domain: "dickiesanz.com",
			},
		},
		"Dickies-NZ": {
			site: {
				name: "dickies",
				currency: "NZD",
				division: "Dickies",
				domain: "dickiesanz.co.nz",
			},
		},
		"Vans-AUS": {
			site: {
				name: "vans",
				currency: "AUD",
				division: "Vans",
				domain: "vans.com.au",
			},
		},
		"Vans-NZ": {
			site: {
				name: "vans",
				currency: "NZD",
				division: "Vans",
				domain: "vans.co.nz",
			},
		},
	};

	const generateJson = () => {
		const brandKey = `${answers.brand}-${answers.region}`;
		const config = brandConfigs[brandKey];

		const baseJson = {
			event: answers.eventName,
			default: {},
		};

		// Always include page data
		baseJson.default.page = {
			type: "home",
			action: "view",
			path: "home",
			title: `Homepage | ${answers.brand} ${answers.region === "AUS" ? "Australia" : "New Zealand"}`,
			url: `https://${config?.site?.domain || "example.com"}/`,
		};

		// Include site data if this is the first event
		if (answers.isFirstEvent) {
			baseJson.default.site = {
				...config.site,
				experience: "desktop",
				env: "stg",
				version: "1.0.0",
			};
		}

		// Include user data if this is the first event
		if (answers.isFirstEvent) {
			baseJson.default.user = {
				user_state: answers.isLoggedIn ? "customer" : "guest",
				login_state: answers.isLoggedIn ? "logged_in" : "anonymous",
				...(answers.isLoggedIn && { "uem_hashed": "74a43f5a2491b706609180d3059d0b4269b25d859801497ec0d248fe75f37ac4" })
			};
		}

		return baseJson;
	};

	useEffect(() => {
		setGeneratedJson(generateJson());
	}, [answers]);

	const handleAnswerChange = (key, value) => {
		setAnswers((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(JSON.stringify(generatedJson, null, 2));
	};

	const downloadJson = () => {
		const blob = new Blob([JSON.stringify(generatedJson, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${answers.eventName}_data_layer.json`;
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="max-w-7xl mx-auto">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Questions Panel */}
				<div>
					<div className="bg-[var(--rp-c-bg-soft)] rounded-lg p-6">
						<div className="space-y-4">
							{/* Question 1: Brand and Region */}
							<div>
								<label className="block text-sm font-medium mb-2">Select brand & region:</label>
								<div className="grid grid-cols-2 gap-3">
									<select
										className="bg-[var(--rp-c-bg-soft)] py-1 px-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										value={answers.brand}
										onChange={(e) => handleAnswerChange("brand", e.target.value)}
									>
										<option value="Dickies">Dickies</option>
										<option value="Vans">Vans</option>
									</select>
									<select
										className="bg-[var(--rp-c-bg-soft)] py-1 px-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										value={answers.region}
										onChange={(e) => handleAnswerChange("region", e.target.value)}
									>
										<option value="AUS">AUS</option>
										<option value="NZ">NZ</option>
									</select>
								</div>
							</div>

							{/* Question 2: Event Name */}
							<div>
								<label className="block text-sm font-medium mb-2">Select event name:</label>
								<select
									className="w-full bg-[var(--rp-c-bg-soft)] py-1 px-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									value={answers.eventName}
									onChange={(e) => handleAnswerChange("eventName", e.target.value)}
								>
									<option value="page_default">page_default</option>
									<option value="product_view">product_view</option>
									<option value="product_listing-view">product_listing-view</option>
									<option value="order_success">order_success</option>
								</select>
							</div>

							{/* Question 3: First Event */}
							<div>
								<label className="block text-sm font-medium mb-2">Is this the first event?</label>
								<div className="flex space-x-4">
									<label className="flex items-center">
										<input type="radio" name="firstEvent" checked={answers.isFirstEvent === true} onChange={() => handleAnswerChange("isFirstEvent", true)} className="mr-2" />
										Yes
									</label>
									<label className="flex items-center">
										<input type="radio" name="firstEvent" checked={answers.isFirstEvent === false} onChange={() => handleAnswerChange("isFirstEvent", false)} className="mr-2" />
										No
									</label>
								</div>
							</div>

							{/* Question 4: Page Refresh */}
							<div className={answers.isFirstEvent ? "opacity-50" : ""}>
								<label className={`block text-sm font-medium mb-2 ${answers.isFirstEvent ? "text-[var(--rp-c-text-1)]" : ""}`}>
									Has the window refreshed?
								</label>
								<div className="flex space-x-4">
									<label className={`flex items-center ${answers.isFirstEvent ? "cursor-not-allowed" : "cursor-pointer"}`}>
									<input
										type="radio"
										name="pageRefresh"
										checked={answers.hasPageRefreshed === true}
										onChange={() => handleAnswerChange('hasPageRefreshed', true)}
										disabled={answers.isFirstEvent}
										className="mr-2"
									/>
									<span className={answers.isFirstEvent ? "text-gray-400" : ""}>Yes</span>
									</label>
									<label className={`flex items-center ${answers.isFirstEvent ? "cursor-not-allowed" : "cursor-pointer"}`}>
									<input
										type="radio"
										name="pageRefresh"
										checked={answers.hasPageRefreshed === false}
										onChange={() => handleAnswerChange('hasPageRefreshed', false)}
										disabled={answers.isFirstEvent}
										className="mr-2"
									/>
									<span className={answers.isFirstEvent ? "text-gray-400" : ""}>No</span>
									</label>
								</div>
							</div>

							{/* Question 5: User Login */}
							<div>
								<label className="block text-sm font-medium mb-2">Is user logged in?</label>
								<div className="flex space-x-4">
									<label className="flex items-center">
										<input type="radio" name="loggedIn" checked={answers.isLoggedIn === true} onChange={() => handleAnswerChange("isLoggedIn", true)} className="mr-2" />
										Yes
									</label>
									<label className="flex items-center">
										<input type="radio" name="loggedIn" checked={answers.isLoggedIn === false} onChange={() => handleAnswerChange("isLoggedIn", false)} className="mr-2" />
										No
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Generated JSON Panel */}
				<div className="bg-gray-900 rounded-lg p-6 lg:col-span-2">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-white">Generated JSON</h2>
						<div className="flex gap-2">
							<button onClick={copyToClipboard} className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
								<Copy size={16} />
								<span>Copy</span>
							</button>
							<button onClick={downloadJson} className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
								<Download size={16} />
								<span>Download</span>
							</button>
						</div>
					</div>

					<div className="bg-[var(--rp-c-text-code-bg)] rounded-md p-4 font-mono text-sm overflow-y-auto">
						<pre className="text-{var(--rp-c-text-code)}">{JSON.stringify(generatedJson, null, 2)}</pre>
					</div>
				</div>
			</div>
		</div>
	);
};

export { JsonBuilder };
