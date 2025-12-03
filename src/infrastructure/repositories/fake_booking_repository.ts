import type { BookingRepository } from "../../domain/repositories/booking_repository";
import type { Booking } from "../../entities/booking";

export class FakeBookingRepository implements BookingRepository {
	private bookings: Booking[] = [];

	async save(booking: Booking): Promise<void> {
		this.bookings.push(booking);
	}

	async findById(id: string): Promise<Booking | null> {
		return this.bookings.find((boking) => boking.getId() === id) || null;
	}
}
