import React from 'react';
import {
  Route, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import routes from '@/config/route';
import BasicLayout from './layout/BasicLayout';

export default () => (
  <Router>
    <Switch>
      <BasicLayout>
        {
          routes.map((item) => (
            <Route key={item.path} path={item.path} component={item.component} />
          ))
        }
      </BasicLayout>
    </Switch>
  </Router>
);
