import { RefundRuleFactory } from "../domain/cacelation/refund_rule_factory";
import type { DateRange } from "../domain/value_objects/data_range";
import { dayDiff } from "../domain/value_objects/day_diff";
import type { Property } from "./property";
import type { User } from "./user";

export class Booking {
	constructor(
		private id: string,
		private property: Property,
		private user: User,
		private dateRange: DateRange,
		private guests: number,
		private totalPrice: number = 0,
		private status: "CONFIRMED" | "CANCELED" = "CONFIRMED",
	) {
		this.validateGustCount(guests, property);

		this.id = id;
		this.property = property;
		this.user = user;
		this.dateRange = dateRange;
		this.guests = guests;
		this.totalPrice = property.calculateTotalPrice(this.dateRange);
	}

	reserve(): number {
		return this.property.addBooking(this);
	}

	validateGustCount(guests: number, property: Property) {
		if (guests <= 0) {
			throw new Error("O número de hospedes precisa ser maior que zero");
		}

		if (guests > property.getMaxGuests()) {
			throw new Error(
				`O numero de hospedes não deve ser superior a ${property.getMaxGuests()}`,
			);
		}
	}

	cancel(date: Date) {
		if (this.status === "CANCELED") {
			throw new Error("Essa reserva já foi cancelada anteriormente");
		}

		const dayUntilCheckIn = dayDiff(date, this.dateRange.getStartDate());

		console.log(dayUntilCheckIn);

		const refund = RefundRuleFactory.getRefundRule(dayUntilCheckIn);
		this.totalPrice = refund.calculeRefund(this.totalPrice);

		this.status = "CANCELED";
	}

	getTotalPrice() {
		return this.totalPrice;
	}

	getStatus() {
		return this.status;
	}

	getId(): string {
		return this.id;
	}
	getProperty(): Property {
		return this.property;
	}
	getUser(): User {
		return this.user;
	}
	getDateRange(): DateRange {
		return this.dateRange;
	}
	getGuests(): number {
		return this.guests;
	}
}
