import BASE_API from '../../App/Services/Api'
import { API_URL } from '../../App/Config/AppConfig'

describe('Authentication API', () => {
  let API;
  beforeAll(() => {
    API = BASE_API.create();
    API.api.post = jest.fn();
    API.api.setHeader = jest.fn();
  });

  it('should have base url by default', () => {
    expect(API.api.getBaseURL()).toBe(API_URL);
  });
  it('should set authorization header', () => {
    const token = 'token';
    API.setAuthToken(token);
    expect(API.api.setHeader).toHaveBeenCalledWith('Authorization', 'Bearer ' + token);
  });

  it('should remove authorization header', () => {
    API.removeAuthToken();
    expect(API.api.setHeader).toHaveBeenCalledWith('Authorization', '');
  });

  it('should post to `client` on signup', () => {
    const user = { email: 'user@email.com', password: 'password' };
    API.signup(user);
    expect(API.api.post).toHaveBeenCalledWith('client', user);
  });
})