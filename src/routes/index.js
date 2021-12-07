import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PlayerDetails } from '../views/index';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path="/playerdetails/8476887">
          <PlayerDetails />
        </Route>
      </Switch>
    </>
  );
}
