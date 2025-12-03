export interface CreateBookingDTO {
	propertyId: string;
	guestId: number;
	startDate: Date;
	endDate: Date;
	guestsCount: number;
}
