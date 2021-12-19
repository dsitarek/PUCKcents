import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Lines, PlayerDetails, PlayerSearch, LineManagement, SignIn,
} from '../views/index';

export default function Routes({ session }) {
  return (
    <>
      <Switch>
        <Route path="/playerSearch">
          <PlayerSearch />
        </Route>
        <Route path="/playerdetails/:playerId">
          <PlayerDetails />
        </Route>
        {session ? (
          <>
            <Route path="/LineManagement/:lineId">
              <LineManagement />
            </Route>
            <Route exact path="/">
              <Lines />
            </Route>
          </>
        ) : <SignIn />}
      </Switch>
    </>
  );
}

Routes.defaultProps = {
  session: null,
};

Routes.propTypes = {
  session: PropTypes.shape(),
};
