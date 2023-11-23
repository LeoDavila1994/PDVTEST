import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { OptionObj } from '../components/modifiers/Modifiers';
import { OptionObjSelected } from '../components/modifiers/ExtraModifiers';

// ? 1 Interfaces Utilizadas en db (HardCode): src\db\db.tsx
export interface Product {
  id: string;
  name: string;
  description: string;
  url: string;
  price: string;
}

export interface numTables {
  area: string;
  numTables: string;
}

export interface Unit {
  unitiName: string;
  amount: number;
}

// ? 2 Interfaces Utilizadas en db (HardCode)

//TODO: 1 Crear el comentario identificador de uso de interface:

export interface DataLogin {
  strUserEmail: string;
  strUserPassword: string;
  idBranch: string;
  strUserPin: string;
}

export interface DataLoginPin {
  strUserPin: string;
  idBranch: string;
}

export type ThunkApp = ThunkAction<void, RootState, unknown, AnyAction>;

//TODO: 2 Crear el comentario identificador de uso de interface

// ? 1 Interfaces utilizadas en hook que trai todas las categorias de alguna sucursal: src\hooks\useProducts.tsx

interface BranchCategory {
  idList: string;
  intTotalProductsList: number;
  strDescription: string;
  strListImage: string;
  strListName: string;
}

export interface DataBranch {
  arrDetail: string[];
  arrList: BranchCategory[];
  boolRecCategory: boolean;
  intResponse: number;
  intTotalProducts: number;
  strUrlRecommendedImage: string;
}

// ? 2 Interfaces utilizadas en hook que trai todas las categorias de alguna sucursal

// ? 1 Interfaces utilizadas en hook que trai todos los productos de una categoria: src\hooks\useProducts.tsx

interface ArrSizes {
  dblSizePrice: number;
  idSize: string;
  intSizeIndex: number;
  strSizeName: string;
  strSizeOnlyName: string;
}
interface ArrProductsByCategory {
  arrBranch: [] | string[];
  arrModifier: [] | string[];
  arrPromos: [] | string[];
  arrRecommended: [] | string[];
  arrSizes: [] | ArrSizes[];
  arrUnavailable: [] | string[];
  boolActive: true;
  boolHasAlcohol: false;
  boolHomeDelivery: true;
  boolPromo: false;
  boolUnavailable: false;
  dblDefaultPrice: string | number;
  dteUpdated: string;
  idList: string;
  intProductIndex: number;
  strProductDescription: string;
  strProductImage: string;
  strProductName: string;
  _id: string;
}
export interface ProductsByCategory {
  arrDetail: string[];
  arrProducts: ArrProductsByCategory[];
  idList: string;
  intResponse: number;
}

// ? 2 Interfaces utilizadas en hook que trai todos los productos de una categoria

// ? 1 Interfaces utilizadas en hook que trai los detalles de un producto: src\hooks\useProducts.tsx

interface ArrSizesDetail {
  boolActive: boolean;
  dblSizePrice: number;
  idCompany: string;
  intSizeIndex: number;
  strSizeMeasure: string;
  strSizeName: string;
  _id: string;
}

export interface ArrModifierOptions {
  boolUnavailable: boolean;
  dblPrice: number;
  strNameOption: string;
}

export interface ArrModifiers {
  arrOptions: [] | ArrModifierOptions[];
  boolActive: boolean;
  boolRequired: boolean;
  idCompany: string;
  intMaxNumberOptions: string | number;
  intModifierIndex: number;
  strModifierName: string;
  _id: string;
}

interface ObjProductDetail {
  arrEditPromo: [] | string[];
  arrFeaturesBranch: [] | string[];
  arrModifier: [] | ArrModifiers[];
  arrPromo: [] | string[];
  arrSize: [] | ArrSizesDetail[];
  arrUnavailable: [] | string[];
  boolInactiveAddShoppingCart: boolean;
  boolModCoupon: boolean;
  boolUnavailable: boolean;
  dblDefaultPrice: number;
  dteUpdateModCoupon: string;
  idProduct: string;
  intBranchPercentage: number;
  intModPrice: number;
  intOasysPercentage: number;
  strCompanyName: string;
  strNameProductImage: string;
  strProductDescription: string;
  strProductImage: string;
  strProductName: string;
}

export interface ProductDetail {
  arrDetail: string[];
  intResponse: number;
  objProduct: ObjProductDetail;
}

// ? 2 Interfaces utilizadas en hook que trai los detalles de un producto

// ? 1 Interface utilizada para definir como llega en props el Array de productos que tienen tamaño a elejir: src\components\modifiers\Sizes.tsx
export interface ArrProducts {
  boolActive: boolean;
  dblSizePrice: number;
  idCompany: string;
  intSizeIndex: number;
  strSizeMeasure: string;
  strSizeName: string;
  _id: string;
}

// ? 2 Interface utilizada para definir como llega en props el Array de productos que tienen tamaño a elejir

// ? 1 Interface creada para definir como debe estar construido el array de productos del Cart: src\components\ExtrasModal.tsx

export interface ProductInCart {
  idCompany: string;
  idList: string;
  idProduct: string;
  strProductName: string;
  strProductImage: string;
  intCant: number;
  intTotal: number;
  strProdNote: string;
  strSizeName: string;
  dblSizePrice: number | string;
  arrUserModifierReq: [] | OptionObj[];
  arrUserModifier: [] | OptionObjSelected[];
  intTotalPercentageProd: number;
  dblPointsPayOff: number;
  intFinalTotal: number;
  dblProductPoints: number;
  dblOasysPoints: number;
  intTotalOasysPercentage: number;
  Status: string;
}

// ? 2 Interface creada para definir como debe estar construido el array de productos del Cart

// interfaces
export interface DataArrayBranch {
  boolAvalible: string;
  idBranch: string;
  idCompany: string;
  strBranchName: string;
  strCompanyImage: string;
  strCompanyName: string;
  strRole: string;
  strTokenDevice: string;
}

export interface UserInfoBranch {
  arrBranch: DataArrayBranch[];
  arrDetail: string[];
  intRespose: number;
}

export interface idBranches {
  idBranch: string;
  idCompany: string;
  strCompanyName: string;
  strBranchName: string;
}

export interface dataTables {
  intPerson: number;
  strDeliveryUserName: string;
  strCompleteAddress: string;
}

export interface DataTicket {
  idUser: string;
  idBranch: string;
  intPerson: string;
  strCommandType: string;
  strTableNumber: string;
  strTableReference: string;
  strDeliveryUserName: string;
  strAreaName: string;
  strCompleteAddress: string;
  idCompany: string;
}

export interface arrTickets {
  Status: string;
  boolOpenAccount: boolean;
  boolPaid: boolean;
  dteTimeOrder: string;
  idUser: string;
  arrProduct: ProductInCart[];
  intTotal: string;
  strCommandType: string;
  _id: string;
  strAreaName: string;
  intPerson: string;
  strTableNumber: string;
  strTableReference: string;
  strDeliveryUserName: string;
  strCompleteAddress: string;
  strPhoneNumber: string;
}

export interface DataTable {
  arrDetail: string[];
  arrTicketsMesa: arrTickets[];
  arrTicketsMostrador: arrTickets[];
  arrTicketsDelivery: arrTickets[];
  arrAreas: arrAreas[];
  intResponse: number;
}

export interface arrAreas {
  strNameArea:string;
  boolSmokingArea:boolean;
  arrTables: arrTables[];
}

export interface arrTables {
  id:string;
  boolState:boolean;
}

export interface CloseTables {
  idUser: string | null;
  idTicket: string | null;
  strPaymentType: string | undefined;
  strTipType: string | undefined;
}
