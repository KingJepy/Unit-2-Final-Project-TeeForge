import React from "react";

// creating the component that can be reused to order items
function OrderItem({ name, price, quantity}) {
    return (
        <tr>
            <td>{name}</td>
            <td>${price}</td>
            <td>{quantity}</td>
            <td>${price * quantity}</td>
        </tr>
    );
}

export default OrderItem;