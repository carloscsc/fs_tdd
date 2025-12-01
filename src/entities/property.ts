import type { DateRange } from "../domain/value_objects/data_range";
import type { Booking } from "./booking";

export class Property {
	private bookings: Booking[] = [];

	constructor(
		private id: string,
		private name: string,
		private description: string,
		private maxGuests: number,
		private basePricePerNight: number,
	) {
		if (!this.name) {
			throw new Error("O nome é obrigatório");
		}

		if (!this.id) {
			throw new Error("O ID é obrigatório");
		}

		this.id = id;
		this.name = name;
		this.description = description;
		this.maxGuests = maxGuests;
		this.basePricePerNight = basePricePerNight;

		this.validateGustCount(0, 20);
	}

	public validateGustCount(minimunGuests: number, maximumGuests: number): void {
		if (this.maxGuests <= minimunGuests) {
			throw new Error("O número de hospedes precisa ser maior que zero");
		}

		if (this.maxGuests > maximumGuests) {
			throw new Error("Número de hospedes não pode ser superior a 20");
		}
	}

	public calculateTotalPrice(range: DateRange) {
		const numberOfNights = range.getTotalNights();
		const pricePerNight = this.getBasePricePerNight();

		if (numberOfNights < 7) {
			return numberOfNights * pricePerNight;
		}

		const total = numberOfNights * pricePerNight;
		const discount = total * 0.1;

		return total - discount;
	}

	public isAvaliable(dateRange: DateRange): boolean {
		return !this.bookings.some(
			(booking) =>
				booking.getStatus() === "CONFIRMED" &&
				booking.getDateRange().overlaps(dateRange),
		);
	}

	public addBooking(booking: Booking): number {
		if (!this.isAvaliable(booking.getDateRange())) {
			throw new Error("Data não avaliada para locação");
		}

		return this.bookings.push(booking);
	}

	public getBookings(): Booking[] {
		return [...this.bookings];
	}

	public getId() {
		return this.id;
	}

	public getName() {
		return this.name;
	}

	public getDescription() {
		return this.description;
	}

	public getMaxGuests() {
		return this.maxGuests;
	}

	public getBasePricePerNight() {
		return this.basePricePerNight;
	}
}
