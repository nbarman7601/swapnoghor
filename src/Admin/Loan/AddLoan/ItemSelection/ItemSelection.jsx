import React, { useEffect, useMemo, useState } from 'react';
import Card from "../../../../Element/Card/Card"
import { useFormContext } from '../FormProvider';
import Button from '../../../../Element/Button';
import apiService from '../../../../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { debounce } from '../../../../helper';
import { toast } from 'react-toastify';
import Counter from '../../../../Element/Counter/Counter';
import CurrencyFormatter from '../../../../common/CurrencyFormatter';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems, updateTotalAmount } from '../../../../store/actions/disburse.action';

export const ItemSelection = () => {
    const {
        cartItems
    } = useSelector((state) => state.disburse);

    const dispatch = useDispatch();

    const { currentStep, setCurrentStep } = useFormContext();
    const [searchText, setSearchText] = useState('');
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const debouncedSetSearchText = useMemo(() => debounce(setSearchText, 500), []);

    useEffect(() => {
        const tAmount = cartItems.reduce((prev, current)=>  prev + (current.qty * current.unitSellPrice), 0)
        setTotalAmount(tAmount);
    }, [cartItems])

    useEffect(() => {
        apiService.get('product/productlist', {
            params: {
                search: searchText,
                sortBy: 'name',
                sort: 'asc',
                page: 1,
                limit: 25,
                status: 'active'
            }
        }).then(
            (response) => {
                console.log(response);
                setItems((prevItems) => response.data);
            }
        ).catch((error) => {
            console.log(error)
        })
    }, [searchText])

    const prev = () => {
        setCurrentStep(1)
    }

    const next = () => { 
        console.log(cartItems, totalAmount)
        dispatch(setCartItems(cartItems));
        dispatch(updateTotalAmount(totalAmount));
        setCurrentStep(3)
    }

    const addToCart = (item) => {
        const isExist = cartItems.find((cartItem) => cartItem._id === item._id);
        if (!isExist) {
            const items = [...cartItems,
            {
                _id: item._id,
                name: item.name,
                qty: 1,
                unitSellPrice: item.eprice,
                baseprice: item.price
            }
            ];
            dispatch(setCartItems(items))
        } else {
            toast.error('Item already in cart');
        }

    }

    const handleQtyChange = (e, index) => {
        const newValues = [...cartItems];
        newValues[index].qty = e.target.value;
        dispatch(setCartItems(newValues))
    }

    const handlePriceChange = (e, index) => {
        const newValues = [...cartItems];
        newValues[index].unitSellPrice = e.target.value;
        dispatch(setCartItems(newValues))
    }

    return (
        <React.Fragment>
            {
                currentStep === 2 ? (
                    <Card>
                        <div className='item-details customer_selection'>
                            <div className='left customer__detail'>
                                <div className="searchItem">
                                    <input
                                        type='text'

                                        onChange={(e) => debouncedSetSearchText(e.target.value)}
                                        placeholder='Search Product' />
                                </div>
                                <table className='item-selection-table'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Available Qty</th>
                                            <th>Price</th>
                                            <th>Add To Cart</th>
                                        </tr>
                                    </thead>
                                    {
                                        items.length > 0 ?
                                            (
                                                <tbody>
                                                    {
                                                        items.map((item) => (
                                                            <tr key={item._id}>
                                                                <td>{item.name}</td>
                                                                <td>
                                                                    {item.stock}
                                                                </td>
                                                                <td>
                                                                    <CurrencyFormatter amount={item.eprice} />
                                                                </td>
                                                                <td>
                                                                    <button onClick={(e) => addToCart(item)}>
                                                                        <FontAwesomeIcon icon={faPlus} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            ) : null
                                    }
                                </table>
                            </div>
                            <div className='customer__information'>
                                {
                                    cartItems.length > 0 ?
                                        (
                                            <table className='right item_details'>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Qty</th>
                                                        <th>Unit Price</th>
                                                        <th>Item Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        cartItems.map((item, index) => (
                                                            <tr key={item._id}>
                                                                <td>{item.name}</td>
                                                                <td>
                                                                    {/* <Counter count={item.qty}/> */}
                                                                    <input
                                                                        type='number'
                                                                        value={item.qty}
                                                                        className='input75'
                                                                        onChange={(e) => handleQtyChange(e, index)}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type={`number`}
                                                                        className='input75'
                                                                        value={item.unitSellPrice}
                                                                        onChange={(e) => handlePriceChange(e, index)}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <CurrencyFormatter amount=
                                                                        {item.qty * item.unitSellPrice} />
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    <tr>
                                                        <td colSpan="3">Total</td>
                                                        <td>
                                                            <CurrencyFormatter amount={totalAmount} />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        ) : null
                                }
                            </div>
                        </div>



                        <div className="btn-container-stepper">
                            <Button onClick={prev}>Prev</Button>
                            <Button onClick={next} className={`next`}>Next</Button>
                        </div>
                    </Card>
                ) : null
            }
        </React.Fragment>
    )
}