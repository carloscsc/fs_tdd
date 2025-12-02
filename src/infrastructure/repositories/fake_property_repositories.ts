import { Property } from "../../entities/property";

export class FakePropertyRepository {
	private properties: Property[] = [
		new Property("1", "Property 1", "First Property", 3, 200),
		new Property("2", "Property 2", "Second Property", 4, 300),
		new Property("3", "Property 3", "Third Property", 6, 600),
		new Property("4", "Property 4", "Forth Property", 8, 1200),
	];

	async findById(id: string): Promise<Property | null> {
		return this.properties.find((property) => property.getId() === id) ?? null;
	}

	async save(property: Property) {
		this.properties.push(property);
	}
}
