import BASE_API from '../../App/Services/Api'
import { API_URL } from '../../App/Config/AppConfig'

describe('Authentication API', () => {
  let API;
  beforeAll(() => {
    API = BASE_API.create();
    API.api.post = jest.fn();
    API.api.get = jest.fn();
    API.api.setHeader = jest.fn();
  });

  it('should have base url by default', () => {
    expect(API.api.getBaseURL()).toBe(API_URL);
  });
  it('should set authorization header', () => {
    const token = 'token';
    const pin = '1234';
    API.setAuthHeaders(token, pin);
    expect(API.api.setHeader).toHaveBeenCalledWith('Authorization', 'Bearer ' + token);
    expect(API.api.setHeader).toHaveBeenCalledWith('Pin', pin);
    API.api.setHeader.mockClear()
  });

  it('should remove authorization header', () => {
    API.removeAuthHeaders();
    expect(API.api.setHeader).toHaveBeenCalledWith('Authorization', '');
    expect(API.api.setHeader).toHaveBeenCalledWith('Pin', '');
    API.api.setHeader.mockClear()
  });

  it('should post to `client` on signup', () => {
    const user = { email: 'user@email.com', password: 'password' };
    API.signup(user);
    expect(API.api.post).toHaveBeenCalledWith('client', user);
    API.api.post.mockClear()
  });

  it('should get from `client` on getProfile', () => {
    API.getProfile();
    expect(API.api.get).toHaveBeenCalledWith('client');
    API.api.get.mockClear()
  });

  it('should post to `account` on new account request', () => {
    const type = 'epar'
    API.requestNewAccount(type);
    expect(API.api.post).toHaveBeenCalledWith('account', { type });
    API.api.post.mockClear()
  });

  it('should get from `bank` on getBanks', () => {
    API.getBanks();
    expect(API.api.get).toHaveBeenCalledWith('bank');
    API.api.get.mockClear()
  });

  it('should post to `virement/myaccount` on myAccountTransfert', () => {
    const data = { amount: 200 }
    API.myAccountTransfert(data);
    expect(API.api.post).toHaveBeenCalledWith('virement/myaccount', data);
    API.api.post.mockClear()
  });

  it('should post to `virement/intern` on tharwaTransfer', () => {
    const data = { amount: 200 }
    API.tharwaTransfer(data);
    expect(API.api.post).toHaveBeenCalledWith('virement/intern', data);
    API.api.post.mockClear()
  });

  it('should post to `virement/extern` on externalTransfer', () => {
    const data = { amount: 200 }
    API.externalTransfer(data);
    expect(API.api.post).toHaveBeenCalledWith('virement/extern', data);
    API.api.post.mockClear()
  });
})