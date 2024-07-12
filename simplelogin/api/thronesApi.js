import axios from 'axios';

const API_URL = 'https://thronesapi.com/api/v2';

export const getCharacters = async () => {
  try {
    const response = await axios.get(`${API_URL}/Characters`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getContinents = async () => {
  try {
    const response = await axios.get(`${API_URL}/Continents`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
