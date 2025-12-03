import type { User } from "../../entities/user";

export interface UserRepository {
	save(property: User): Promise<void>;
	findById(id: number): Promise<User | null>;
}
