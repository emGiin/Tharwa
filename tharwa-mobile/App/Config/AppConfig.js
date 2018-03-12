// Simple React Native specific changes

import '../I18n/I18n'
export const BASE_URL = 'https://reqres.in/api';
export const AUTH_API_URL = `${BASE_URL}/oath/`;
export const API_URL = `${BASE_URL}/`;

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
}
