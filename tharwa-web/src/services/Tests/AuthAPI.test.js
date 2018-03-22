import AuthAPI from '../AuthAPI'
import { AUTH_API_URL } from '../../config/AppConfig'

describe('Authentication API', () => {
  let API;
  beforeAll(()=>{
    API = AuthAPI.create();
    API.api.post = jest.fn();
  });


  it('should have base url by default', ()=>{
    expect(API.api.getBaseURL()).toBe(AUTH_API_URL);
  });


  it('should post to `pincode` on login', ()=>{
    const user = {email: 'user@email.com', password: 'password', confirmationMethod:1};
    API.login(user);
    expect(API.api.post).toHaveBeenCalledWith('pincode', user);
  });

  it('should post to `token` on confirmPinCode', ()=>{
    const data = {pin: "1324"};
    API.confirmPinCode(data);
    expect(API.api.post).toHaveBeenCalledWith('token', data);
  });

})
