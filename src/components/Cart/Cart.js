import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import spinner from "../../assets/spinner.svg";

const Cart = (props) => {
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `€ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onOrder = () => {
    setShowButton(!showButton);
    setConfirmOrder(!confirmOrder);
  };

  async function addMealHandler(orderInfo) {
    setIsLoading(true);
    setShowMessage(false);

    const response = await fetch(
      "https://order-food-app-25b86-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          orderedItems: cartCtx.items,
          userInfo: orderInfo,
        }),
        headers: { "Content-type": "application/json" },
      }
    );
    const data = await response.json();
    setIsLoading(false);
    setShowMessage(true);
    cartCtx.clearCart(); /*viene richiamata la funzione per riportare il cart al default state (vuoto)*/
  }

  return (
    <Modal onClick={props.onClose}>
      {isLoading && !showMessage ? (
        <div className={classes.spinner}>
          <img src={spinner} alt="spinner"></img>
        </div>
      ) : !isLoading &&
        showMessage /*show message viene settato a true alla fine del processo di invio dei dati*/ ? (
        <div className={classes.spinner}>
          <p>Order completed!!</p>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {showButton && (
            <div className={classes.actions}>
              <button
                className={classes["button--alt"]}
                onClick={props.onClose}
              >
                Close
              </button>
              {hasItems && (
                <button className={classes.button} onClick={onOrder}>
                  Order
                </button>
              )}
            </div>
          )}
          {confirmOrder && (
            <Checkout onClose={props.onClose} onAddMeal={addMealHandler} />
          )}
        </>
      )}
    </Modal>
  );
};

export default Cart;
