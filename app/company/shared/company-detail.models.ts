
//models
import { Financial } from '../../financial/shared/financial.models';

export class CompanyDetail {
        permanentSecurityID: string
        entityId: string

        city: string
        state: string
        zipCode: string
        street1: string
        street2: string
        street3: string
        phone: string

        countryISO: string
        latestAnnualUpdate: string
        companyName: string
        businessDescriptionAbbrev: string
        marketValueCurrent: number
        cashFlowPerShare: number
        dividendsPerShare: number
        priceToBookValue: number
        dividendYield: number
        dividendPayoutPerShare: number
        priceToEarnings: number

        universeAmerica: boolean
        universeEurope: boolean
        universeAsiaPacific: boolean

        entityTypeDescription: string
        sICCode: string
        sICDescription: string
        industryDescription: string
        sectorDescription: string
        ticker: string
        exchange: string

        financialStatements: Financial
}
