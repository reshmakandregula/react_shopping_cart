import React, { Component } from "react";
import { FaRupeeSign } from "react-icons/fa";
import Modal from "react-modal";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

class Products extends Component {
  state = {
    product: null,
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading....</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product._id} className="mb">
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}
                    >
                      <img src={product.image} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>
                        <FaRupeeSign size={15} />: {product.price}/-
                      </div>
                      <button
                        className="button primary"
                        onClick={() => this.props.addToCart(product)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal ff1" onClick={this.closeModal}>
                {" "}
                x
              </button>
              <div className="product-details ff1 ">
                <img src={product.image} alt={product.title}></img>
                <div className="product-details-description ff1">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    <strong>{product.description}</strong>
                  </p>
                  <p>
                    Available Sizes :{"   "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {"  "}{" "}
                        <button className="button ff1 buttonSize">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price ff1">
                    <div>
                      Price: {"   "}
                      {product.price}/-
                    </div>
                    <button
                      className="button primary ff1 buttonSize"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   products: state.products.items;
// };

export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);
