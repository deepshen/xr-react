import React from 'react';
import {
  Route, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import routes from '@/config/route';

const routeFn = (rt) => rt.map((item) => {
  if (item.layout) {
    const Layout = item.layout;
    return (
      <Layout key={item.path}>
        {item.children ? routeFn(item.children)
          : <Route exact key={item.path} path={item.path} component={item.component} />}
      </Layout>
    );
  } if (item.children) {
    return routeFn(item.children);
  }
  return <Route exact key={item.path} path={item.path} component={item.component} />;
});
export default () => (
  <Router>
    <Switch>
      {
        routeFn(routes)
      }
    </Switch>
  </Router>
);
