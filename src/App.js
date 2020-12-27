import React, { Component } from "react";
import Products from "./components/Products";
import { FaShoppingCart } from "react-icons/fa";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <div className="iconStyle1">
              <FaShoppingCart />
            </div>

            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products />
              </div>
              <div className="sidebar">
                Card Items....
                <Cart />
              </div>
            </div>
          </main>
          <footer>All right is reserved,</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
