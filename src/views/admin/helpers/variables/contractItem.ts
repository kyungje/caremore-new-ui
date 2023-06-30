interface ContractItem {
    contractId: number;
    memberId: number;
    memberName: string;
    helperId: number;
    helperName: string;
    helperJobType: string;
    targetName: string;
    expense: number;
    contractStatus: string;
    deleteYn: string;
    location: string;
    careRange: string;
    memberPhoneNumber: string;
    helperPhoneNumber: string;
}

export default ContractItem;