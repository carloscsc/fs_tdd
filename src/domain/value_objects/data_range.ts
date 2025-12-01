export class DateRange {
	private readonly startDate: Date;
	private readonly endDate: Date;

	constructor(init: Date, end: Date) {
		this.startDate = init;
		this.endDate = end;

		this.validateDate(init, end);
	}

	private validateDate(startDate: Date, endDate: Date): void {
		if (endDate < startDate) {
			throw new Error("A data de termino deve ser superior a data de inicio");
		}

		if (endDate === startDate) {
			throw new Error("A data inicio e termino não pode ser iguais");
		}
	}

	public getStartDate() {
		return this.startDate;
	}

	public getEndDate() {
		return this.endDate;
	}

	public getTotalNights() {
		const diffInMs = this.endDate.getTime() - this.startDate.getTime();
		const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
		return diffInDays;
	}

	public overlaps(other: DateRange): boolean {
		return this.startDate < other.endDate && other.startDate < this.endDate;
	}
}
