// Simple React Native specific changes

export const BASE_URL = 'https://reqres.in/api';
// export const BASE_URL = 'http://192.168.0.100:8888';
export const AUTH_API_URL = `${BASE_URL}/oauth/`;
export const API_URL = `${BASE_URL}/`;

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
}
