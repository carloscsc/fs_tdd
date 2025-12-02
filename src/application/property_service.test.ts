import { FakePropertyRepository } from "../infrastructure/repositories/fake_property_repositories";
import { PropertyService } from "./property_service";

describe("PropertyService", () => {
	let propertyService: PropertyService;
	let fakePropertyRepository: FakePropertyRepository;

	beforeEach(() => {
		fakePropertyRepository = new FakePropertyRepository();
		propertyService = new PropertyService(fakePropertyRepository);
	});

	it("Should return null when invalid ID are provided", async () => {
		const property = await propertyService.findPropertyById("999");
		expect(property).toBeNull();
	});
});
