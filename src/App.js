import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          {/* switching between components based on the url-path */}
          <Route path="/orders" component={Order} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
