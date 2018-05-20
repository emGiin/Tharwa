import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from "./Dashboard";
import ConfirmInscription from "./ConfirmInscription";
import ValidateTransfer from "./ValidateTransfer";
import RegistrationForm from './createBanquier'
import OtherAccount from './OtherAccount';
import AccountManagement from "./AccountManagement";
import ValidateTransferOrder from "./ValidateTransferOrder";

export default () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route
      render={() => (
        <div style={{ padding: 0, background: '#fff' }}>
          <Route path="/demandeInscriptions" component={ConfirmInscription} />
          <Route path="/otherAccount" component={OtherAccount} />
          <Route path="/virements" component={ValidateTransfer} />
          <Route path="/creerBanquier" component={RegistrationForm} />
          <Route path="/accountManagement" component={AccountManagement} />
          <Route path="/ordresVirement" component={ValidateTransferOrder} />
        </div>
      )}
    />
  </Switch>
);
