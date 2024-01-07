import axios from './axiosInstance';

export const getAllData = async (txHash = '') => {
  try {
    const { data } = await axios.get('/cats', {
      params: {
        txHash,
      },
    });
    return data;
  } catch (error) {
    console.error('Error getDataByTxHash:', error);
  }
};

export const getDataByTxHash = async (txHash = '') => {
  try {
    const { data } = await axios.get(`/cats/${txHash}`);
    return data;
  } catch (error) {
    console.error('Error getDataByTxHash:', error);
  }
};

export const create = async (data: any) => {
  try {
    const response = await axios.post('/cats', data);
    return response.data;
  } catch (error) {
    console.error('Error create:', error);
  }
};
