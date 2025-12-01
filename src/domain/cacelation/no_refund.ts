import type { RefundRule } from "./refund_rule.interface";

export class NoRefund implements RefundRule {
	calculeRefund(totalPrice: number): number {
		return totalPrice;
	}
}
