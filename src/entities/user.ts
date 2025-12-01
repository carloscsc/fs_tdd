export class User {
	readonly #id: number;
	readonly #name: string;

	constructor(userId: number, userName: string) {
		this.#id = userId;
		this.#name = userName;
	}

	public get name() {
		return this.#name;
	}

	public get id() {
		return this.#id;
	}
}
