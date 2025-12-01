import { User } from "./user";

describe("User Entities", () => {
	it("Deve criar um instancia de User com ID e nome", () => {
		const user = new User(1, "Carlos Sabo Cantanzaro");

		expect(user).toBeInstanceOf(User);
		expect(user.id).toBe(1);
		expect(user.name).toBe("Carlos Sabo Cantanzaro");
	});
});
