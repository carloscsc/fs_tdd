import { DateRange } from "./data_range";

describe("DateRange value Object", () => {
	it("Deve criar uma instancia de DataRange com a data de inicio e a data de termino", () => {
		const startDate = new Date("2025-12-20");
		const endDate = new Date("2025-12-25");
		const range = new DateRange(startDate, endDate);

		expect(range).toBeInstanceOf(DateRange);
		expect(range.getStartDate()).toBe(startDate);
		expect(range.getEndDate()).toBe(endDate);
	});

	it("Deve lançar um erro se a date de termino for antes da data de inicio", () => {
		expect(() => {
			new DateRange(new Date("2025-12-24"), new Date("2025-12-20"));
		}).toThrow("A data de termino deve ser superior a data de inicio");
	});

	it("Deve lançar um erro se a data de inicio e termino forem iguais", () => {
		const date = new Date("2025-11-26");

		expect(() => {
			new DateRange(date, date);
		}).toThrow("A data inicio e termino não pode ser iguais");
	});

	it("Deve retornar o total de noite", () => {
		// First test
		const startDate = new Date("2025-12-20");
		const endDate = new Date("2025-12-25");
		const range = new DateRange(startDate, endDate);
		const totalNights = range.getTotalNights();
		expect(totalNights).toBe(5);

		// second test, to ensure accuracy
		const startDate2 = new Date("2025-12-10");
		const endDate2 = new Date("2025-12-25");
		const range2 = new DateRange(startDate2, endDate2);
		const totalNights2 = range2.getTotalNights();
		expect(totalNights2).toBe(15);
	});

	it("Deve verificar se duas data se sobrepõem", () => {
		const dataRange1 = new DateRange(
			new Date("2025-11-20"),
			new Date("2025-11-25"),
		);

		const dataRange2 = new DateRange(
			new Date("2025-11-22"),
			new Date("2025-11-27"),
		);

		const overlaps = dataRange1.overlaps(dataRange2);

		expect(overlaps).toBe(true);
	});
});
