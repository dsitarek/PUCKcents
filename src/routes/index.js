import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PlayerDetails, PlayerSearch } from '../views/index';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path="/">
          <PlayerSearch />
        </Route>
        <Route path="/playerdetails/:playerId">
          <PlayerDetails />
        </Route>
      </Switch>
    </>
  );
}
