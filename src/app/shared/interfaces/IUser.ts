export interface UserInterface {
    id: number | null | undefined;
            username: string | null | undefined;
            phone_number: string | null | undefined;
            user_permissions: Array<string> | null | undefined;
            is_active: boolean | null | undefined;
}