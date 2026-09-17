export interface Account {
    account_name?: string;
    account_number?: string;
    total_budgetary_resources?: number;
}
export interface AccountListMatch {
    fiscal_year?: number;
}
export interface Agency {
    code?: string;
    id?: string;
    name?: string;
    total_obligations?: number;
}
export interface AgencyListMatch {
    sort?: string;
}
export interface Award {
    agency?: Record<string, any>;
    amount?: number;
    description?: string;
    id?: string;
    recipient?: Record<string, any>;
    type?: string;
}
export interface AwardListMatch {
    limit?: number;
    page?: number;
}
export interface Search {
}
export interface SearchCreateData {
    $action?: string;
    [action: string]: any;
}
export interface Spending {
    breakdown?: any[];
    fiscal_year?: number;
    total_spending?: number;
}
export interface SpendingListMatch {
    agency?: string;
    fiscal_year?: number;
}
