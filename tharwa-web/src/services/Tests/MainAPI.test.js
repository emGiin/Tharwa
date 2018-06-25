import MainAPI from '../MainAPI'
import { API_URL } from '../../config/AppConfig'

describe('Main API', () => {
  let API;
  beforeAll(()=>{
    API = MainAPI.create();
    API.api.post = jest.fn();
    API.api.get = jest.fn();
  });


  it('should have base url by default', ()=>{
    expect(API.api.getBaseURL()).toBe(API_URL);
  });

  it('should get dataset on request', ()=> {
    API.inscriptions.getDataset()
    expect(API.api.get).toHaveBeenCalledWith('clientRequests')

    API.virements.getDataset()
    expect(API.api.get).toHaveBeenCalledWith('virement/validations')

    API.accounts.getDataset()
    expect(API.api.get).toHaveBeenCalledWith('account/validations')
  })

  it('should send post on action request', ()=>{
    API.inscriptions.action({id:8, code: 1})
    expect(API.api.post).toHaveBeenCalledWith('clientRequests',{email:8, code: 1})

    API.virements.action({id:8, code: 1})
    expect(API.api.post).toHaveBeenCalledWith('virement/validations',{virement_code:8, code: 1})

    API.accounts.action({id:8, code: 1})
    expect(API.api.post).toHaveBeenCalledWith('account/validations',{id:8, code: 1})
  })
})
