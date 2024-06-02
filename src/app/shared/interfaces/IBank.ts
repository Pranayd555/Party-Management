export interface BankInterface {
    id?: number | null | undefined;
    bank_ifsc_code?: string | null | undefined;
    bank_name?: string | null | undefined;
    branch_name?: string | null | undefined;
    account_no?: string | null | undefined;
    account_holder_name?: string | null | undefined;
    is_active?: boolean | null | undefined;
}