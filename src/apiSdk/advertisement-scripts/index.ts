import axios from 'axios';
import queryString from 'query-string';
import { AdvertisementScriptInterface, AdvertisementScriptGetQueryInterface } from 'interfaces/advertisement-script';
import { GetQueryInterface } from '../../interfaces';

export const getAdvertisementScripts = async (query?: AdvertisementScriptGetQueryInterface) => {
  const response = await axios.get(`/api/advertisement-scripts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAdvertisementScript = async (advertisementScript: AdvertisementScriptInterface) => {
  const response = await axios.post('/api/advertisement-scripts', advertisementScript);
  return response.data;
};

export const updateAdvertisementScriptById = async (id: string, advertisementScript: AdvertisementScriptInterface) => {
  const response = await axios.put(`/api/advertisement-scripts/${id}`, advertisementScript);
  return response.data;
};

export const getAdvertisementScriptById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/advertisement-scripts/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteAdvertisementScriptById = async (id: string) => {
  const response = await axios.delete(`/api/advertisement-scripts/${id}`);
  return response.data;
};
