import { FakeUserRepositories } from "../infrastructure/repositories/fake_user_repositories";
import { UserService } from "./user_service";

describe("UserService", () => {
	let userService: UserService;
	let fakeUserRepositorie: FakeUserRepositories;

	beforeEach(() => {
		fakeUserRepositorie = new FakeUserRepositories();
		userService = new UserService(fakeUserRepositorie);
	});

	it("Should return null when a invalid ID are provided", async () => {
		const user = await userService.findUserById(999);
		expect(user).toBe(null);
	});

	it("Should return a User when a valid ID are provide", async () => {
		const user = await userService.findUserById(1);
		expect(user).not.toBe(null);

		expect(user?.id).toBe(1);
		expect(user?.name).toBe("John Doe");
	});
});
