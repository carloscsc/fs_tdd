import { DateRange } from "../domain/value_objects/data_range";
import { Booking } from "./booking";
import { Property } from "./property";
import { User } from "./user";

describe("Booking entity", () => {
	it("should  create a instace of booking with all atributes", () => {
		const property = new Property("1", "Case", "Descrição da casa", 5, 200);
		const user = new User(1, "Carlos");
		const dateRage = new DateRange(
			new Date("2025-12-20"),
			new Date("2025-12-25"),
		);

		const booking = new Booking("1", property, user, dateRage, 2);

		expect(booking.getId()).toBe("1");
		expect(booking.getProperty()).toBe(property);
		expect(booking.getUser()).toBe(user);
		expect(booking.getDateRange()).toBe(dateRage);
		expect(booking.getGuests()).toBe(2);
	});

	it("Should verify if the date range is available for booking", () => {
		// Arrange
		const property = new Property("1", "Case", "Descrição da casa", 5, 200);
		const user = new User(1, "Carlos");
		const dateRage = new DateRange(
			new Date("2025-12-20"),
			new Date("2025-12-25"),
		);

		const dateRage2 = new DateRange(
			new Date("2025-12-22"),
			new Date("2025-12-27"),
		);

		const dateRage3 = new DateRange(
			new Date("2025-12-23"),
			new Date("2025-12-28"),
		);

		// act
		const book = new Booking("1", property, user, dateRage, 2);
		book.reserve();

		const book2 = new Booking("2", property, user, dateRage2, 4);

		// assert
		expect(book.getStatus()).toBe("CONFIRMED");

		expect(() => book2.reserve()).toThrow("Data não avaliada para locação");
		expect(property.isAvaliable(dateRage3)).toBe(false);
	});

	it("Should throw a error if booking date is less or equal to 0", () => {
		const property = new Property("1", "Casa", "Descrição da casa", 8, 200);
		const user = new User(1, "Carlos");
		const dateRage = new DateRange(
			new Date("2025-12-20"),
			new Date("2025-12-25"),
		);

		expect(() => new Booking("1", property, user, dateRage, -1)).toThrow(
			"O número de hospedes precisa ser maior que zero",
		);
	});

	it("Should throw a error if booking date is granther then property max guests", () => {
		const property = new Property("1", "Casa", "Descrição da casa", 8, 200);
		const user = new User(1, "Carlos");
		const dateRage = new DateRange(
			new Date("2025-12-20"),
			new Date("2025-12-25"),
		);

		expect(() => new Booking("1", property, user, dateRage, 9)).toThrow(
			"O numero de hospedes não deve ser superior a 8",
		);
	});

	it("Should calc the total price", () => {
		// Arrange
		const property = new Property("1", "Casa", "Descrição da casa", 8, 200);
		const user = new User(1, "Carlos");
		const dateRage = new DateRange(
			new Date("2025-12-20"),
			new Date("2025-12-25"),
		);

		// Act
		const book = new Booking("1", property, user, dateRage, 2);

		// Assert
		expect(book.getTotalPrice()).toBe(1000);
	});

	it("Should cancel without refund if check-in is in one day", () => {
		// Arrange
		const property = new Property("1", "Casa", "Descrição da casa", 8, 200);
		const user = new User(1, "Carlos");
		const dateRage = new DateRange(
			new Date("2025-12-20"),
			new Date("2025-12-25"),
		);
		const book = new Booking("1", property, user, dateRage, 2);

		// Act
		const currentDate = new Date("2025-12-20");
		book.cancel(currentDate);

		// Assert
		expect(book.getStatus()).toBe("CANCELED");
		expect(book.getTotalPrice()).toBe(1000);
	});

	it("Should cancel with partial refund if check-in before at least 1 day", () => {
		// Arrange
		const property = new Property("1", "Casa", "Descrição da casa", 8, 200);
		const user = new User(1, "Carlos");
		const dateRage = new DateRange(
			new Date("2025-12-20"),
			new Date("2025-12-25"),
		);
		const book = new Booking("1", property, user, dateRage, 2);

		// Act
		const currentDate = new Date("2025-12-19");
		book.cancel(currentDate);

		// Assert
		expect(book.getStatus()).toBe("CANCELED");
		expect(book.getTotalPrice()).toBe(500);
	});

	it("Should cancel with total refund if check-in is at least 7 days before refund", () => {
		// Arrange
		const property = new Property("1", "Casa", "Descrição da casa", 8, 200);
		const user = new User(1, "Carlos");
		const dateRage = new DateRange(
			new Date("2025-12-20"),
			new Date("2025-12-25"),
		);
		const book = new Booking("1", property, user, dateRage, 2);

		// Act
		const currentDate = new Date("2025-12-12");
		book.cancel(currentDate);

		// Assert
		expect(book.getStatus()).toBe("CANCELED");
		expect(book.getTotalPrice()).toBe(0);
	});

	it("Should throw a erro if reservation is already cancelled", () => {
		// Arrange
		const property = new Property("1", "Casa", "Descrição da casa", 8, 200);
		const user = new User(1, "Carlos");
		const dateRage = new DateRange(
			new Date("2025-12-20"),
			new Date("2025-12-25"),
		);
		const book = new Booking("1", property, user, dateRage, 2);

		// Act
		const currentDate = new Date("2025-12-12");
		book.cancel(currentDate);

		// Assert
		expect(() => book.cancel(currentDate)).toThrow(
			"Essa reserva já foi cancelada anteriormente",
		);
	});
});
