import type { Property } from "../../entities/property";
import type { FakePropertyRepository } from "../../infrastructure/repositories/fake_property_repositories";

export class PropertyService {
	constructor(private readonly propertyRepository: FakePropertyRepository) {}

	async findPropertyById(id: string): Promise<Property | null> {
		return this.propertyRepository.findById(id);
	}
}
