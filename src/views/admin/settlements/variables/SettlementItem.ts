interface SettlementItem {
    id: number;
    contractId: number;
    contractHelperName: string;
    settledAmount: number;
    settlementState: string;
    approvedDateTime: string;
}

export default SettlementItem;