import { Booking } from "../../entities/booking";
import { FakeBookingRepository } from "../../infrastructure/repositories/fake_booking_repository";
import type { CreateBookingDTO } from "../dtos/create_booking_dto";
import { BookingService } from "./booking_service";
import { PropertyService } from "./property_service";
import { UserService } from "./user_service";

jest.mock("./property_service");
jest.mock("./user_service");

describe("BookingService", () => {
	let fakeBookingRepository: FakeBookingRepository;
	let bookingService: BookingService;
	let mockPropertyService: jest.Mocked<PropertyService>;
	let mockUserService: jest.Mocked<UserService>;

	beforeEach(() => {
		const mockPropertyRepository = {} as any;
		const mockUserRepository = {} as any;

		mockPropertyService = new PropertyService(
			mockPropertyRepository,
		) as jest.Mocked<PropertyService>;

		mockUserService = new UserService(
			mockUserRepository,
		) as jest.Mocked<UserService>;

		fakeBookingRepository = new FakeBookingRepository();

		bookingService = new BookingService(
			fakeBookingRepository,
			mockPropertyService,
			mockUserService,
		);
	});

	it("Should booking a reserver using the fake repository", async () => {
		const mockProperty = {
			getId: jest.fn().mockReturnValue("1"),
			isAvailable: jest.fn().mockReturnValue(true),
			validateGuestCount: jest.fn(),
			getMaxGuests: jest.fn().mockReturnValue(4),
			calculateTotalPrice: jest.fn().mockReturnValue(1800),
			addBooking: jest.fn(),
		} as any;

		const mockUser = {
			getId: jest.fn().mockReturnValue(1),
		} as any;

		mockPropertyService.findPropertyById.mockResolvedValue(mockProperty);
		mockUserService.findUserById.mockResolvedValue(mockUser);

		const bookingDTO: CreateBookingDTO = {
			propertyId: "1",
			guestId: 1,
			startDate: new Date("2024-07-01"),
			endDate: new Date("2024-07-10"),
			guestsCount: 2,
		};

		const result = await bookingService.createBooking(bookingDTO);

		expect(result).toBeInstanceOf(Booking);
		expect(result.getStatus()).toBe("CONFIRMED");
		expect(result.getTotalPrice()).toBe(1800);
	});
});
