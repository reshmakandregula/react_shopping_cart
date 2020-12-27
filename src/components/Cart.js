import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";

class Cart extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    showCheckOut: false,
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  closeModal = () => {
    this.props.clearOrder();
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
  };
  render() {
    const { cartItems, order } = this.props;
    return (
      <div className="cart">
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is Empty</div>
        ) : (
          <div className="cart cart-header">
            You Have {cartItems.length} items in the cart {"  "}
          </div>
        )}
        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal ff1" onClick={this.closeModal}>
                x
              </button>
              <div className="order-details ff1">
                <h3 className="success-message">
                  Your Order has been placed...
                </h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name: </div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email: </div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address: </div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Total : </div>
                    <div>{order.total}</div>
                  </li>
                  <li>
                    <div>Cart Items: </div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div>
                          {x.count}
                          {" x "}
                          {x.title}
                          {"  "}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>{" "}
          </Modal>
        )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {item.price} /- x {item.count}
                        {"  "}
                        <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{"  "}
                    {cartItems.reduce((a, c) => a + c.price * c.count, 0)}/-
                  </div>
                  <button
                    onClick={() => this.setState({ showCheckOut: true })}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckOut && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            className="ff1"
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            className="ff1"
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            className="ff1"
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            CheckOut
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ order: state.order.order, cartItems: state.cart.cartItems }),
  {
    removeFromCart,
    createOrder,
    clearOrder,
  }
)(Cart);
