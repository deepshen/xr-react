import React from 'react';
import {
  Route, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import routes from '@/config/route';
import BasicLayout from './layout/BasicLayout';

const routeFn = (rt) => rt.map((item) => {
  if (item.children) {
    return routeFn(item.children);
  }
  return <Route exact key={item.path} path={item.path} component={item.component} />;
});
export default () => (
  <Router>
    <Switch>
      <BasicLayout>
        {
            routeFn(routes)
          }
      </BasicLayout>
    </Switch>
  </Router>
);
