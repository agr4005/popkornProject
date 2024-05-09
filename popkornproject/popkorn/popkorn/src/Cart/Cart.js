import React from 'react';

import CartListFrom from './CartListFrom/CartListFrom'
import Header from '../header/Header';

import './Cart.css'

function Cart() {
    return (
        <>
            <Header />
            <div className='Cartmain'>
                <CartListFrom />
            </div>
        </>
    );
}

export default Cart;
