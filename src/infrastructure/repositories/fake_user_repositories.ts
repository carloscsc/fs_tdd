import { User } from "../../entities/user";

export class FakeUserRepositories {
	private users: User[] = [new User(1, "John Doe"), new User(2, "Jane Doe")];

	async findById(id: number): Promise<User | null> {
		return this.users.find((user) => user.id === id) ?? null;
	}

	async save(user: User) {
		this.users.push(user);
	}
}
