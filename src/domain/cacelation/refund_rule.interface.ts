export interface RefundRule {
	calculeRefund(totalPrice: number): number;
}
