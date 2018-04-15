import React from "react";
import { Route, Switch } from "react-router-dom";

import ConfirmInscription from "./ConfirmInscription";

export default () => (
  <Switch>
    <Route exact path="/" render={() => "Dashboard"} />
    <Route path="/demandeInscriptions" component={ConfirmInscription} />
    <Route path="/creerBanquier" render={() => "creerBanquier"} />
  </Switch>
);
