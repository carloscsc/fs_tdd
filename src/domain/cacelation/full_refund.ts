import type { RefundRule } from "./refund_rule.interface";

export class FullRefund implements RefundRule {
	calculeRefund(totalPrice: number): number {
		return totalPrice - totalPrice; // total a pagar
	}
}
