import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../utilities/apiClient';
import { DataBranch, ProductDetail, ProductsByCategory } from '../utilities/types.d';

const fetchBranch = async (idCompany: string, idBranch: string) => {
  const { data } = await apiClient.get<DataBranch>(`/CompanyList/${idCompany}/${idBranch}/""`);

  return data;
};

export function useGetAllCategorysProduct(idCompany: string, idBranch: string) {
  return useQuery(['branches'], () => fetchBranch(idCompany, idBranch), {
    enabled: !!(idCompany && idBranch),
  });
}

const fetchProductsByCategory = async (idCompany: string, idBranch: string, id: string) => {
  const { data } = await apiClient.get<ProductsByCategory>(
    `/CompanyProductsList/${idCompany}/${idBranch}/${id}/Guest/0/""`
  );
  return data;
};

export function useGetProductsByCategory(idCompany: string, idBranch: string, id: string) {
  return useQuery(['productsInList'], () => fetchProductsByCategory(idCompany, idBranch, id), {
    enabled: !!(idCompany && idBranch && id),
  });
}

interface Ids {
  idList: string;
  idProduct: string;
}

const fetchProductDetails = async (idCompany: string, idBranch: string, ids: Ids) => {
  const { idList, idProduct } = ids;

  const { data } = await apiClient.get<ProductDetail>(
    `/ProductInfo/Guest/${idCompany}/${idList}/${idProduct}/${idBranch}`
  );

  return data;
};

export function useGetProductDetails(idCompany: string, idBranch: string, ids: Ids) {
  return useQuery({ queryKey: ['productDetails'], queryFn: () => fetchProductDetails(idCompany, idBranch, ids) });
}

export const useAddArrProducts = () => {
  const response = useMutation({
    mutationFn: async (data: any) => {
      const request = await apiClient.post('/ProductsInCartCommand', data);
      return request;
    },
  });
  return response;
};

export const useUpdateStatusProduct = () => {
  const response = useMutation({
    mutationFn: async (data: any) => {
      const { idTicket, status, idShoppingProd } = data;
      const request = await apiClient.put(`/updateProductStatus/${idTicket}`, { status, idShoppingProd });
      return request;
    },
  });
  return response;
};
