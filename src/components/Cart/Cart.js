import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = props => {
    const [isCheckout, setIscheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const CartItems = (
        <ul className={classes['cart-items']}>
    {cartCtx.items.map(item => <CartItem key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)} 
        onAdd={cartItemAddHandler.bind(null, item)} />
    )}
    </ul>
    );

    const orderHandler = () => {
        setIscheckout(true);
    }

    const modalActons = <div className={classes.actions}>
    <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>

    return (
    <Modal onClose={props.onClose}>
        {CartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onClose} />}
        {!isCheckout && modalActons}
        
    </Modal>
    )
};

export default Cart;