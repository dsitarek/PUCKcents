import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authenticated from '../views/Authenticated';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Authenticated />
        </Route>
      </Switch>
    </>
  );
}
