import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chooseRest, fillShopCard } from '../../redux/slice'; 
import * as selectors from '../../redux/selectors'
import Container from '../../components/Container';
import Loader from '../../components/Loader';
import { toast } from "react-toastify";
import s from './ShopPage.module.scss';


const ShopPage = () => {
    const [dishes, setDishes] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [filterRest, setFilterRest] = useState("");

    const dispatch = useDispatch();
    const listOfRestaurants = useSelector(selectors.getAllRestaurants);
    const chosenRest = useSelector(selectors.getChosenRest);
    const shoppingCard = useSelector(selectors.getShopingCard);
    const loading = useSelector(selectors.getLoading);

    const selectRestaurant = useCallback((name) => {
        setFilterRest(name);
    },[]);

    const handleChoose = useCallback((data) => {
        dispatch(fillShopCard(data));
        dispatch(chooseRest(data['restaurant']));
    }, [dispatch]);

    const getFilteredDishes = useMemo(() => {
        if (filterRest) {
            return dishes.filter(({ restaurant }) => restaurant === filterRest);
        } else {
            return dishes;
        }
    },[filterRest, dishes]);

    const settingData = useCallback(() => {
        listOfRestaurants.forEach(({ _id: id, name, dishes }) => {
            setRestaurants(prev => [...prev, { id, name }]);
            setDishes(prev => [...prev, ...dishes]);
        });
    }, [listOfRestaurants]);

    useEffect(() => {
        if (listOfRestaurants.length !== 0) {
            settingData();
        };

        return () => {
            setRestaurants([]);
            setDishes([]);
        };
    }, [listOfRestaurants, settingData]);

    useEffect(() => {
        if (chosenRest) {
            setFilterRest(chosenRest);
        }
    }, [chosenRest]);


    return (
        <Container>
            <div className={s.main}>
                <div className={s.shopList}>
                    <p className={s.lable}>Shops:</p>
                    <ul className={s.shopList_list}>
                        {restaurants.map(({ id, name }) =>
                            <li
                                key={id}
                                className={s.shopList_item}
                                onClick={() => {
                                    if ((chosenRest !== name) && chosenRest !== "") {
                                        return toast.warning("You can order only from 1 shop!");
                                }}}>
                            <button
                                type='button'
                                className={(chosenRest !== name) && chosenRest !== "" ? s.shopList_button_dis : s.shopList_button}
                                disabled={(chosenRest !== name) && chosenRest !== ""}
                                onClick={() => selectRestaurant(name)}>
                                {name}
                            </button>
                        </li>)}
                    </ul>
                </div>
                {loading ? <Loader /> : 
                <ul className={s.foodGallery}>
                    {getFilteredDishes.map(item =>
                    {
                        const { _id: id, dishe_name, price, restaurant, image } = item;

                        return (<li key={id} className={s.foodGallery_item}>
                            <div className={s.imageThumb}>
                                <img src={image} alt='food' width={200} className={s.image} />
                            </div>
                            <div className={s.description}>
                                <h3 className={s.name}>{dishe_name}</h3>
                                <p>{restaurant}</p>
                                <p className={s.price}>${price}</p>
                                <button
                                    type='button'
                                    className={s.button}
                                    onClick={() => handleChoose(item)}
                                    disabled={shoppingCard.some(({_id: elemId}) => id === elemId)}
                                >
                                    Add To Card
                                </button>
                            </div>
                        </li>);
                    })}
                </ul>
                }
                
            </div>
        </Container>
    )
};

export default ShopPage;