import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import BasicLayout from "./layout/BasicLayout";
import Home from './view/web/Home'

export default () => (
  <BrowserRouter>
    <BasicLayout>
      <Route path='/' component={Home} />
    </BasicLayout>
  </BrowserRouter>
)
