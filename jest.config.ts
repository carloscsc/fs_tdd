import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/*.test.ts"],
	// moduleDirectories: ["ts", "js"],
};

export default config;
