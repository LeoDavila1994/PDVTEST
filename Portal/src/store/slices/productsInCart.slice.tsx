import { createSlice } from '@reduxjs/toolkit';
import { ProductInCart } from '../../utilities/types.d';

export const productsInCartySlice = createSlice({
  name: 'productsInCart',
  initialState: [],
  reducers: {
    setProductInCart: (state, action) => {
      const { payload } = action;

      const intCant = payload.intCant;

      const newArr: any = [...state];

      if (intCant !== 1) {
        const newObj = { ...payload };

        newObj.intCant = 1;
        for (let i = 0; i < intCant; i++) {
          newArr.push(newObj);
        }

        return newArr;
      }

      newArr.push(payload);

      return newArr;
    },
    setAddNote: (state, action) => {
      const { note, index } = action.payload;

      const newArr: any = [...state];

      const newNote = { ...newArr[index] };

      newNote.strProdNote = note;

      newArr[index] = newNote;

      return newArr;
    },
    setEditSizeInfo: (state, action) => {
      const { index, sizePrice, sizeName } = action.payload;

      const newArr: any = [...state];

      const newObjt = { ...newArr[index] };

      newObjt.dblSizePrice = sizePrice;

      newObjt.strSizeName = sizeName;

      newArr[index] = newObjt;

      return newArr;
    },
    setEditModReq: (state: any, action) => {
      const { arrUserModifierReq, index } = action.payload;

      state[index].arrUserModifierReq = arrUserModifierReq;
    },
    setEditModNoReq: (state: ProductInCart[], action) => {
      const { arrUserModifier, index } = action.payload;

      state[index].arrUserModifier = arrUserModifier;
    },
    setRemakeSum: (state: any, action) => {
      let total = 0;
      const { index, dblDefaultPrice, sizePrice, arrUserModifierReq, arrUserModifier } = action.payload;

      const totalsModifieresReq = arrUserModifierReq.reduce((acumulador: number, elementoActual: any) => {
        const { dblPrice } = elementoActual;
        return acumulador + dblPrice;
      }, 0);

      const totalsModifiersNoReq = arrUserModifier.reduce((acumulador: number, elementoActual: any) => {
        const { dblPrice } = elementoActual;
        return acumulador + dblPrice;
      }, 0);

      total = dblDefaultPrice + (sizePrice === '' ? 0 : sizePrice) + totalsModifieresReq + totalsModifiersNoReq;

      state[index].intFinalTotal = total;
      state[index].intTotal = total;
    },
    setRemoveProducts: (state, action) => {
      const index = action.payload;

      const newArr = state.filter((_product, i) => i != index);

      return newArr;
    },
    setConfirmOrder: () => {
      return [];
    },
  },
});

export const {
  setProductInCart,
  setAddNote,
  setEditSizeInfo,
  setEditModReq,
  setEditModNoReq,
  setRemakeSum,
  setRemoveProducts,
  setConfirmOrder,
} = productsInCartySlice.actions;

export default productsInCartySlice.reducer;
