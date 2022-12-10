import React, { useEffect,useState,link } from "react";
import EmptyCart from '../assets/empty_cart.svg';
import { Link } from 'react-router-dom'

export default function Cart({cart, changeQuantity, removeItem}) {
    const subTotal = () => {
    let sub = 0;
    cart.forEach((item) => {
        sub += +((item.salePrice || item.originalPrice) * item.quantity)
        })
        return sub;
    }

    
  return (
    <div className="books__body">
      <div className="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>
            <div className="cart">
{cart.length > 0 && <div className="cart__header">
                <span className="cart__book">Book</span>
                <span className="cart__quantity">Quantity</span>
                <span className="cart__total">Price</span>
              </div>}
              <div className="cart__body">
                {
                    cart.map((book) => {
                        return (
                            <div className="cart__item">
                            <div className="cart__book">
                              <img
                                className="cart__book--img"
                                src={book.url}
                                alt=""
                              />
                              <div className="cart__book--info">
                                <span className="cart__book--title">
                                  {book.title}
                                </span>
                                <span className="cart__book--price">${(book.salePrice || book.originalPrice).toFixed(2)}</span>
                                <button className="cart__book--remove" onClick={() => removeItem(book)}>Remove</button>
                              </div>
                            </div>
                            <div className="cart__quantity">
                              <input
                                type="number"
                                min={1}
                                max={99}
                                className="cart__input"
                                value={book.quantity}
                                onChange={(event) => changeQuantity(book,event.target.value)}
                              />
                            </div>
                            <div className="cart__total">${((book.salePrice || book.originalPrice) * book.quantity).toFixed(2)}</div>
                          </div>
                        )
                    })
                }
              </div>
            {cart.length <= 0 && <div className="cart__empty">
                <img src={EmptyCart} alt="" className="cart__empty--img"/>
                <h2>Your cart is empty! Check out our selection of books</h2>
                <Link to="/books">
                <button className="btn">Browse Books</button>
                </Link>
              </div>}
            </div>
            { cart.length > 0 && <div className="total">
              <div className="total__item total__sub-total">
                <span>Subtotal</span>
                <span>${subTotal().toFixed(2)}</span>
              </div>
              <div className="total__item total__tax">
                <span>Tax</span>
                <span>${(subTotal() * .05).toFixed(2)}</span>
              </div>
              <div className="total__item total__price">
                <span>Total</span>
                <span>${(+subTotal() + (subTotal() * .05)).toFixed(2)}</span>
              </div>
              <Link to={'/checkout'} className="book_link">
                  <button className="btn">Proceed to Checkout</button>
                    </Link>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
