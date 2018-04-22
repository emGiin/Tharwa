import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import ConfirmInscription from './ConfirmInscription';
import ValidateTransfer from './ValidateTransfer';

export default () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route
      render={() => (
        <div style={{ padding: 0, background: '#fff' }}>
          <Route path="/demandeInscriptions" component={ConfirmInscription} />
          <Route path="/virements" component={ValidateTransfer} />
          <Route path="/creerBanquier" render={() => 'creerBanquier'} />
        </div>
      )}
    />
  </Switch>
);
