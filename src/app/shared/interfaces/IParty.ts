import { AddressInterface } from "./IAddress";
import { BankInterface } from "./IBank";
import { UserInterface } from "./IUser";

export interface PartyInterface {
    id?: number | null | undefined;
        bank_id?: BankInterface[] | null | undefined;
        address?: AddressInterface[] | null | undefined;
        userid?: UserInterface | null | undefined;
        login_access?: boolean | null | undefined;
        name?: string | null | undefined;
        company_name?: string | null | undefined;
        mobile_no?: string | null | undefined;
        telephone_no?: string | null | undefined;
        whatsapp_no?: string | null | undefined;
        email?: string | null | undefined;
        remark?: string | null | undefined;
        date_of_birth?: string | null | undefined;
        anniversary_date?: string | null | undefined;
        gstin?: string | null | undefined;
        pan_no?: string | null | undefined;
        apply_tds?: boolean | null | undefined;
        credit_limit?: number | null | undefined;
        is_active?: boolean | null | undefined;
        image?: File | null | undefined;
}