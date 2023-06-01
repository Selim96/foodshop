import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from '../../redux/selectors';
import ShopAPI from '../../services/api';
import { clearHistory } from "../../redux/slice";
import TextField from '@mui/material/TextField';
import Loader from "../../components/Loader";
import s from './HistoryPage.module.scss';

const shopApi = new ShopAPI();

const HistoryPage = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [noContent, setNoContent] = useState(false);

    const dispatch = useDispatch();
    const history = useSelector(selectors.getOrderByEmail);
    const loading = useSelector(selectors.getLoading);

    console.log(history)

    const handlChange = e => {
        console.log(e.target.name)
        switch (e.target.name) {
        case 'email':
            setEmail(e.target.value);
            break;
        
        case 'phone':
            setPhone(e.target.value);
            break;
        
        default:
            break;
        }
    };

    const handlSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            email,
            phone: Number(phone),
        };
        dispatch(shopApi.getOrder(dataToSend));
        setNoContent(true);
    };

    const handlClear = () => {
        dispatch(clearHistory());
        setEmail('');
        setPhone('');
        setNoContent(false);
    };

    return (
        <div className={s.main}>
            <form id="form_history" className={s.section_inputs} onSubmit={handlSubmit}>
                <p className={s.text}>Input your e-mail and phone to see history of orders.</p>
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
            </form>
                <button type="submit" form="form_history" className={s.button}>Submit</button>
                <button type="button" className={s.button } onClick={handlClear} disabled={history.length === 0}>Clear</button>
            {loading && <Loader/>}
            {history.length === 0 && !loading && noContent && <p className={s.nolist}>You have not any orders yet.</p>}
            {history.length !== 0 && !loading && <ul className={s.list}>
                {history.map(({ _id: mainId, food, createdAt }) => {
                const date = new Date(createdAt);
                const publishedAt = date.toDateString().split(" ").slice(1).join(" ");
                const priceArr = [];
                return (
                <li key={mainId} className={s.item}>
                    <ul className={s.minilist}>
                        {food.map(({ _id, image, count = 1, price, dishe_name }) => {
                            priceArr.push(count * price);
                        return (
                        <li key={_id} className={s.minilist_item}>
                            <div className={s.image_thumb}>
                                <img src={image} alt='food' width={100} />
                            </div>
                            <div className={s.minilist_text}>
                                    <p className={s.minilist_name}>{dishe_name}</p>
                                    <p className={s.minilist_name}>Price: ${price} x {count}</p>
                            </div>
                        </li>)})}
                    </ul>
                    <div className={s.description}>
                            <p>Date: {publishedAt}</p>
                            <p>Total Price: ${priceArr.reduce((prev, elem)=> prev + elem, 0)}</p>
                    </div>
                </li>)
                })}
            </ul>}
        </div>
    )
};

export default HistoryPage;