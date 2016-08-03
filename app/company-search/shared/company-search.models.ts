export class CompanySearch {
     countries: Country[]
     industries: Industry[] 
     sectors: Sector[] 
     sics: SIC[] 
     entityTypes: EntityType[] 
     universe: Universe
}

export class CompanyList {
     permanentSecurityId: string
     entityId: string
     countryISO: string 
     latestAnnualUpdate: number
     companyName: string 
     businessDescriptionAbbrev: string 
     marketValueCurrent: number

     //search criteria
     universeAmerica: boolean
     universeEurope: boolean 
     universeAsiaPacific: boolean 

     country: Country 
     industry: Industry 
     sector: Sector 
     sic: SIC 
     entityType: EntityType 
}

export class PagedCompanyList {
     data: CompanyList[]
     count: number
}

export class Universe {
     americaUniverse: boolean 
     europeUniverse: boolean 
     asiaPacificUniverse: boolean 
} 

export class Country {
     isoCountry: string
     countryDescription: string 
     isoCurrency: string 
     region: Region 
}

export class Region {
     regionCode: string
     regionDescription: string 
}

export class Industry {
     industryCode: string 
     industryDescription: string 
}

export class Sector {
     sectorCode: string 
     sectorDescription: string 
}

export class SIC {
     sicCode: string 
     sicDescription: string 
}

export class EntityType {
     entityTypeCode: string 
     entityTypeDescription: string 
}

export class SearchParams {
    entityTypes: EntityType[]
    sicCodes: SIC[]
    sectors: Sector[]
    countries: Country[]
    industries: Industry[]

    americaUniverse: boolean
    europeUniverse: boolean
    asiaPacificUniverse: boolean 
}