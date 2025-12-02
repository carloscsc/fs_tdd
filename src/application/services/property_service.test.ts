import { Property } from "../../entities/property";
import { FakePropertyRepository } from "../../infrastructure/repositories/fake_property_repositories";
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

	it("Should return property when valid ID are provided", async () => {
		const property = await propertyService.findPropertyById("1");
		expect(property).not.toBeNull();
		expect(property?.getId()).toBe("1");
		expect(property?.getName()).toBe("Property 1");
	});

	it("Should Save property correctly", async () => {
		const property = new Property(
			"5",
			"Property 5",
			"Fifith Property",
			9,
			1600,
		);

		await fakePropertyRepository.save(property);
		const savedProperty = await propertyService.findPropertyById("5");
		expect(savedProperty).not.toBeNull();
		expect(savedProperty).not.toBeNull();
		expect(savedProperty?.getId()).toBe("5");
		expect(savedProperty?.getName()).toBe("Property 5");
	});
});
