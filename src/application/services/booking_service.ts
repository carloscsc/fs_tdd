import { v4 as uuid } from "uuid";
import type { BookingRepository } from "../../domain/repositories/booking_repository";
import { DateRange } from "../../domain/value_objects/data_range";
import { Booking } from "../../entities/booking";
import type { CreateBookingDTO } from "../dtos/create_booking_dto";
import type { PropertyService } from "./property_service";
import type { UserService } from "./user_service";

export class BookingService {
	constructor(
		private readonly bookingRepoitory: BookingRepository,
		private readonly propertyService: PropertyService,
		private readonly userService: UserService,
	) {}

	async createBooking(dto: CreateBookingDTO): Promise<Booking> {
		const property = await this.propertyService.findPropertyById(
			dto.propertyId,
		);

		if (!property) {
			throw new Error("Property not found");
		}

		const user = await this.userService.findUserById(dto.guestId);

		if (!user) {
			throw new Error("User not found");
		}

		// TODO: Altamente aclopado criar um mock
		const dateRange = new DateRange(dto.startDate, dto.endDate);

		const booking = new Booking(
			uuid(),
			property,
			user,
			dateRange,
			dto.guestsCount,
		);

		await this.bookingRepoitory.save(booking);
		return booking;
	}

	async findBookingById(id: string): Promise<Booking | null> {
		return this.bookingRepoitory.findById(id);
	}
}
