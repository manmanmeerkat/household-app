export type TransactionType = "income" | "expense";
export type imcomCategory = "給与" | "副収入" | "お小遣い";
export type expenseCategory = "食費" | "日用品" | "交通費" | "交際費" | "娯楽" | "住居費";

export interface Transaction {
    id: string,
    date: string,
    amount: number,
    content: string,
    type: TransactionType,
    category: imcomCategory | expenseCategory,
}

export interface Balance {
    income: number,
    expense: number,
    balance: number,
}

export interface CalendarContent {
    start: string,
    income: string,
    expense: string,
    balance: string,
}