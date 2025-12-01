import { DateRange } from "../domain/value_objects/data_range";
import { Property } from "./property";

describe("property entity", () => {
	it("should create a instace of property with all Attributes", () => {
		const property = new Property(
			"1",
			"Casa de Praia",
			"Uma bela casa na praia",
			4,
			200,
		);

		expect(property.getId()).toBe("1");
		expect(property.getName()).toBe("Casa de Praia");
		expect(property.getDescription()).toBe("Uma bela casa na praia");
		expect(property.getMaxGuests()).toBe(4);
		expect(property.getBasePricePerNight()).toBe(200);
	});

	it("should throw a error if name is empty", () => {
		expect(() => {
			new Property("1", "", "Descrição", 4, 200);
		}).toThrow("O nome é obrigatório");
	});

	it("should throw a error if ID is empty", () => {
		expect(() => {
			new Property("", "Teste", "Descrição", 4, 200);
		}).toThrow("O ID é obrigatório");
	});

	it("should throw a error if number of guest is less or equal to zero", () => {
		expect(() => {
			new Property("1", "Teste", "Descrição", 0, 200);
		}).toThrow("O número de hospedes precisa ser maior que zero");

		expect(() => {
			new Property("1", "Teste", "Descrição", -1, 200);
		}).toThrow("O número de hospedes precisa ser maior que zero");
	});

	it("Should throw a error if number of guests is higher than 20", () => {
		expect(() => {
			new Property("1", "Teste", "descrição", 21, 200);
		}).toThrow("Número de hospedes não pode ser superior a 20");
	});

	it("should not apply discount if date range is less than 7 days", () => {
		const property = new Property(
			"1",
			"Casa de Praia",
			"descricão da casa de praia",
			5,
			200,
		);

		const range = new DateRange(new Date("2025-12-20"), new Date("2025-12-26"));

		const totalPrice = property.calculateTotalPrice(range);
		expect(totalPrice).toBe(1200);
	});

	it("should apply discount if date range is granther than 7 days", () => {
		const property = new Property(
			"1",
			"Casa de Praia",
			"descricão da casa de praia",
			5,
			200,
		);

		const range = new DateRange(new Date("2025-12-20"), new Date("2025-12-27"));

		const totalPrice = property.calculateTotalPrice(range);
		const priceWithDiscount = 1400 - 1400 * 0.1;
		expect(totalPrice).toBe(priceWithDiscount);
	});
});
