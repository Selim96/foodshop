import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../redux/selectors';
import Container from '../../components/Container';
import TextField from '@mui/material/TextField';
import ShopAPI from '../../services/api';
import { changeCard, addFormData } from '../../redux/slice';
import { toast } from "react-toastify";
import s from './ShoppingCard.module.scss';

const shopApi = new ShopAPI();

const ShoppingCard = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const notInitialRender = useRef(false);

    const dispatch = useDispatch();
    const shoppingCard = useSelector(selectors.getShopingCard);
    const formData = useSelector(selectors.getFormData);

    useEffect(() => {
        if (formData) {
            setName(formData.name);
            setEmail(formData.email);
            setPhone(formData.phone);
            setAddress(formData.adress);
        }
    }, []);

    useEffect(() => {
        if (notInitialRender.current) {
            const dataToSend = {
                name,
                email,
                phone: phone,
                adress: address
            };
            dispatch(addFormData(dataToSend));
        } else {
            notInitialRender.current = true;
        }
    }, [name, email, phone, address, dispatch]);

    const handlChange = e => {
        switch (e.target.name) {
        case 'name':
            setName(e.target.value);
            break;
        
        case 'email':
            setEmail(e.target.value);
            break;
        
        case 'phone':
            setPhone(e.target.value);
            break;
        
        case 'address':
            setAddress(e.target.value);
            break;
        
        default:
            break;
        }
    };

    const handlBlur = useCallback((e) => {
        if (e.target.value < Number(e.target.min)) {
            e.target.value = Number(e.target.min);
        } else if (e.target.value > Number(e.target.max)) {
            e.target.value = Number(e.target.max)
        }
        const id = e.target.dataset.input;
        const newArr = shoppingCard.map(elem => {
            const { _id, dishe_name, price, image, restaurant } = elem;
            if (_id === id) {
                return { _id, dishe_name, price, restaurant, image, count: e.target.value };
            } else {
                return elem;
            }
        });

        dispatch(changeCard(newArr));
    }, [dispatch, shoppingCard]);

    const handlSubmit = (e) => {
        e.preventDefault();
        if (shoppingCard.length !== 0) {
            const dataToSend = {
                name,
                email,
                phone: Number(phone),
                adress: address,
                food: [...shoppingCard]
            };
        
        dispatch(shopApi.addOrder(dataToSend));
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        } else {
            toast.error('Before you have to add dishes!')
        }
    };

    const handlDelete = (id) => {
        const newCard = shoppingCard.filter( ({_id: itemID}) => id !== itemID );
        dispatch(changeCard(newCard));
    };


    return (
        <Container>
            <div className={s.main}>
                <div>
                    <div>
                        <form id='add_order' className={s.form} onSubmit={handlSubmit}>
                            <div className={s.input_box}>
                                <TextField
                                    name='name'
                                    id="outlined-controlled"
                                    label="Name"
                                    value={name}
                                    type='text'
                                    variant="outlined"
                                    size="small"
                                    classes={{root: 'input'}}
                                    fullWidth={true}
                                    required
                                    onChange={handlChange}
                                />
                            </div>
                            <div className={s.input_box}>
                                <TextField
                                    name='email'
                                    id="outlined-controlled"
                                    label="Email"
                                    value={email}
                                    type='email'
                                    variant="outlined"
                                    size="small"
                                    classes={{root: 'input'}}
                                    fullWidth={true}
                                    required
                                    onChange={handlChange}
                                />
                            </div>
                            <div className={s.input_box}>
                                <TextField
                                    name='phone'
                                    id="outlined-controlled"
                                    label="Phone"
                                    value={phone}
                                    type='number'
                                    variant="outlined"
                                    size="small"
                                    classes={{root: 'input'}}
                                    fullWidth={true}
                                    required
                                    onChange={handlChange}
                                />
                            </div>
                            <div className={s.input_box}>
                                <TextField
                                    name='address'
                                    id="outlined-controlled"
                                    label="Address"
                                    value={address}
                                    type='text'
                                    variant="outlined"
                                    size="small"
                                    classes={{root: 'input'}}
                                    fullWidth={true}
                                    required
                                    onChange={handlChange}
                                />
                            </div>
                        </form>
                    </div>
                    {shoppingCard.length === 0 ? <p>List of order is clear</p> :
                        <ul className={s.list_cards}>
                            {shoppingCard.map(({_id: id, dishe_name, price, image, count = 1}) =>
                            <li key={id} className={s.list_item}>
                                <div className={s.image_thumb}>
                                    <img src={ image} alt='food' width={200}/>
                                </div>
                                <div>
                                    <p className={s.name}>{dishe_name}</p>
                                    <p>Price: $ {price}</p>
                                        <input
                                            type='number'
                                            name='count'
                                            className={s.count_input}
                                            min={1} max={50}
                                            value={count}
                                            onChange={handlBlur}
                                            data-input={id}
                                        />
                                        <button type='button' onClick={()=>handlDelete(id)}>Delete</button>
                                </div>
                            </li>)}
                        </ul>}
                </div>
                <div>
                    <p>Total: <span>{shoppingCard.reduce((prev, elem)=>prev + elem.price * (elem.count ? elem.count : 1), 0)}</span></p>
                    <button type='submit' form='add_order' className={s.button}>Submit</button>
                </div>
            </div>
        </Container>
    )
};

export default ShoppingCard;