import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Lines, PlayerDetails, PlayerSearch } from '../views/index';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path="/playerSearch">
          <PlayerSearch />
        </Route>
        <Route path="/playerdetails/:playerId">
          <PlayerDetails />
        </Route>
        <Route exact path="/">
          <Lines />
        </Route>
      </Switch>
    </>
  );
}
