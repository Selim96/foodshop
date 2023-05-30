import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShopAPI from '../../services/api';
import { chooseRest } from '../../redux/slice'; 
import * as selectors from '../../redux/selectors'
import Container from '../../components/Container';
import { toast } from "react-toastify";
import s from './ShopPage.module.scss';

const shopApi = new ShopAPI();

const ShopPage = () => {
    const [dishes, setDishes] = useState([]);

    const dispatch = useDispatch();
    const listOfRestaurants = useSelector(selectors.getAllRestaurants);
    const chosenRest = useSelector(selectors.getChosenRest);
    console.log(chosenRest);

    const handleChoose = (name) => {
        dispatch(chooseRest(name))
    };

    useEffect(() => {
        if (listOfRestaurants.length !== 0) {
            if (chosenRest) {
                const oneShop = listOfRestaurants.filter(item => item.name === chosenRest);
                setDishes(oneShop.dishes);
            } else {
                listOfRestaurants.
            }
            setDishes()
        }
    }, []);

    useEffect(() => {
        dispatch(shopApi.allRestaurants());
    }, [dispatch]);

    return (
        <Container>
            <div className={s.main}>
                <div className={s.shopList}>
                    <p>Shops:</p>
                    <ul className={s.shopList_list}>
                        {listOfRestaurants.map(({ _id: id, name }) => <li key={id} className={s.shopList_item} onClick={()=> handleChoose(name)}>
                            {name}
                        </li>)}
                    </ul>
                </div>
                <ul className={s.foodGallery}>
                    {listOfRestaurants.map(({})=><li key={} className={s.foodGallery_item}></li>)}
                </ul>
            </div>
        </Container>
    )
};

export default ShopPage;