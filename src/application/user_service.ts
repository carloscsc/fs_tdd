import type { User } from "../entities/user";
import type { FakeUserRepositories } from "../infrastructure/repositories/fake_user_repositories";

export class UserService {
	constructor(private readonly userRepository: FakeUserRepositories) {}

	async findUserById(id: number): Promise<User | null> {
		return this.userRepository.findById(id);
	}
}
