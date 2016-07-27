export class Financial {
        permanentSecurityID: string
        annualFinancialStatements: FinancialDetail[]
        quarterlyFinancialStatements: FinancialDetail[]
        LTMFinancialStatements: FinancialDetail[]
        semiAnnualFinancialStatements: FinancialDetail[]
    }

export class FinancialDetail {
        date: Date
        adjustedDate: Date
        currency: string
        financialStatements: BalanceModel[]
    }

export class BalanceModel {
        reportCode: string
        displayOrder: number
        displayLevel: string
        description: string
        fieldName: string
        negative: number

        annual: number
        quarterly: number
        LTM: number
        semiAnnual: number

        value: string

    }