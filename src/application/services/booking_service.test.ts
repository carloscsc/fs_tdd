import type { CreateBookingDTO } from "../dtos/create_booking_dto";

describe("BookingService", () => {
	it("Should booking a reserver using the fake repository", () => {
		const bookingDTO: CreateBookingDTO = {
			propertyId: "1",
			guestId: "guest_123",
			startDate: new Date("2024-07-01"),
			endDate: new Date("2024-07-10"),
			guestsCount: 2,
		};


        const result  = await bookingService.createBooking(bookingDTO);

        expect(result).toBeInstanceOf(Booking);
        expect(result.getStatus()).toBe("CONFIRMED");
        expect(result.getTotalPrice()).toBe(1800); // 9 nights * $200 per night
	});
});
