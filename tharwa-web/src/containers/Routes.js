import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Dashboard from './Dashboard';
import ManagerHome from './ManagerHome';
import BankerHome from './BankerHome';
import ConfirmInscription from './ConfirmInscription';
import ValidateTransfer from './ValidateTransfer';
import RegistrationForm from './createBanquier';
import Commissions from './Commissions';
import OtherAccount from './OtherAccount';
import AccountManagement from './AccountManagement';
import ValidateTransferOrder from './ValidateTransferOrder';
import DeblockRequests from './DeblockRequests';

export default ({ clientType }) => (
  <Switch>
    {clientType === 'Banquier' && (
      <div>
        <Route exact path="/" component={BankerHome} />

        <Route
          render={() => (
            <div style={{ padding: 0, background: '#fff' }}>
              <Route
                path="/demandeInscriptions"
                component={ConfirmInscription}
              />
              <Route path="/otherAccount" component={OtherAccount} />
              <Route path="/virements" component={ValidateTransfer} />
              <Route path="/accountManagement" component={AccountManagement} />
              <Route path="/ordresVirement" component={ValidateTransferOrder} />
              <Route path="/deblockAccount" component={DeblockRequests} />
            </div>
          )}
        />
      </div>
    )}
    {clientType === 'Gestionnaire' && (
      <div>
        <Route exact path="/" component={ManagerHome} />

        <Route
          render={() => (
            <div style={{ padding: 0, background: '#fff' }}>
              <Route path="/creerBanquier" component={RegistrationForm} />
              <Route path="/listCommissions" component={Commissions} />
            </div>
          )}
        />
      </div>
    )}
  </Switch>
);
