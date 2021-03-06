import { Chain } from '@angular/compiler';
export interface Branch {
    BranchCode: number;
    BranchID: number;
    BranchName: string;
}

export interface Customer {
    CustomerId: number;
    PaymentTypeID: number;
    PrimayContact: string;
    Active: boolean;
    BranchID: number;
    BranchCode: number;
    LocationID: number;
    LocationCode: string;
    RouteID: number;
    RouteCode: string;
    CustomerNumber: number;
    CustomerName: string;
    CustType: number;
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    Country: string;
    ZipCode: number;
    Phone: number;
    Extn: string;
    Email: string;
    Company: string;
    LocationKey: string;
    CustomerKey: string;
    ChainCode: string;
    ChainZone: string;
    PrimaryContact: string;
    SecondaryContact: string;
    TicketMessage: string;
    IsTaxable: boolean;
	Isupic: boolean;
    TaxPercentage: number;
    CustomerTypeCode: string;
    latitude: string;
    longitude: string;
    AllowReturnSameTicket: any;
    FreightCodePriceFile: string;
    MobileIn: boolean;
    SoldBy: string;
    AreaCode: string;
    PORequired: number;
	PONumber: string;
    PrevBalance: string;
    PrintUPC: boolean;
    CustomerGLType: string;
    StoreDept: string;
    DUNSNumber: number;
    DistributorType: string;
    DistributorMasterID: string;
    productdetail: ProductDetail[];
    Tax: number;
    CustomerTypeID: number;
    PaymentType: number;
    MappedProducts?: MapProducts[];
    CustomerType: number;
    IsTaxassble: boolean;
    Address: string;
    EmailID: string;
    IsDex: boolean;
    Chain: string;
    EditedProducts?: MapProducts[];
    NewAddedProducts?: MapProducts[];
    IsInternal: boolean;
    ChainID: number;
    sChainID: string;
    NotesForMemo: any;
    AXCustomerNumber: any;
}
export interface MProducts {
    ExternalCustomerProductID: number;
    ExternalCustomerID: number;
    ProductID: number;
    Price: number;
    BranchID: number;
    isActive: boolean;
    Created: any;
    CreatedBy: number;
    Modified: any;
    ModifiedBy: any;
    ExternalProductID: number;
    ProductId: number;
    ExternalProductId: any;
}
export interface MapProducts {
    ProductCode: number;
    ProductId: number;
    DisplayName: string;
    ProductName: string;
    ExternalProductId: number;
    ProductPrice: number;
	TaxPercentage:number;
    ExternalCustomerId: number;
    IsInternal: boolean;
    IsActive: boolean;
    cProductId: string;
}

export interface ProductDetail {
    Active: number;
    CustomerProductID: number;
    DisplayName: string;
    Drayage: number;
    Price: number;
    ProductCode: number;
    ProductID: number;
    ProductName: string;
    SKU: number;
    UPC: string;
}

export interface Select {
    id: number;
    label: string;
    data?: any;
}

export interface DualListItem {
    label: string;
    id: number;
    data: any;
    selected?: boolean;
}
