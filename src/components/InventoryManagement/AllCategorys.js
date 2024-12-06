import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import './styles/AllCategorys.css';
import { Link } from "react-router-dom";
import './styles/AllProducts.css'
import total from "./images/total.png";
import lowstock from "./images/lowstock.png";

import './styles/Inventory.css'
import Header from './Header';
import NavBar from './NavBar';

export default function AllCategorys() {
    const [categories, setCategories] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [productLowCount, setProductLowCount] = useState(0);
    const [damagedCount, setdamagedCount] = useState(0);
    const [disposedCount, setdisposedCount] = useState(0);
    const [search, setSearch] = useState('');


    useEffect(() => {
        getAllCategory();
        getCount();
        getLowCount();
        getDamagedCount();
        getDisposedCount();
    }, []);

    function getAllCategory() {
        axios.get(`http://localhost:8070/categorys/getAllImages`)
            .then((res) => {
                setCategories(res.data.category);
            }).catch((err) => {
                console.error(err);
            });
    }

    function getCount() {

        // Fetch count of products
        axios.get("http://localhost:8070/products/count").then((res) => {
            setProductCount(res.data.count);
        }).catch((err) => {
            alert(err);
        });
    }

    function getLowCount() {

        // Fetch Low Stocked Items
        axios.get("http://localhost:8070/products/lowCount").then((res) => {
            setProductLowCount(res.data.count);
        }).catch((err) => {
            alert(err);
        });
    }

    function getDamagedCount() {

        // Fetch Low Stocked Items
        axios.get("http://localhost:8070/products/damagedItemCount").then((res) => {
            setdamagedCount(res.data.count);
        }).catch((err) => {
            alert(err);
        });
    }

    function getDisposedCount() {

        // Fetch Low Stocked Items
        axios.get("http://localhost:8070/products/disposedItemCount").then((res) => {
            setdisposedCount(res.data.count);
        }).catch((err) => {
            alert(err);
        });
    }

    return (
        <div>
            <Header />
            <div class="containerApp">

                <div class="nav-container">
                    <NavBar />
                </div>

                <div class="content-container">
                    <div>
                        <h1> Inventory Management System </h1>
                        <hr className="big" />

                        <div className="AllProductContainer">

                            <div className="notify">

                                <div className="notifySub">
                                    <img src={total} />
                                    <Link to={`/AllProducts`} style={{ textDecoration: 'none', color: 'aliceblue' }}>Total Products: {productCount}</Link>
                                </div>

                                <div className="notifySubLowStocked">
                                    <img src={lowstock} />
                                    <Link to={`/LowStockedList`} style={{ textDecoration: 'none', color: 'red' }} >Out of Stock: {productLowCount}</Link>
                                </div>

                                <div className="notifySub">
                                    <img src={total} />
                                    <Link to={`/DamageItemList`} style={{ textDecoration: 'none', color: 'aliceblue' }}>Total Expired Items: {damagedCount}</Link>
                                </div>

                                <div className="notifySub">
                                    <img src={total} />
                                    <Link to={`/DisposedItemList`} style={{ textDecoration: 'none', color: 'aliceblue' }}>Total Disposed Items: {disposedCount}</Link>

                                </div>

                            </div>

                            <div class="button-row">
                                <Link to={`/GenerateReports`} className="button link-button">Generate Reports</Link>
                                <Link to={`/AllProducts`} className="button link-button">Manage Items</Link>
                                <Link to={`/add`} className="button link-button">Add New Items</Link>
                                <Link to={`/AddCategory`} className="button link-button">Add New Category</Link>

                                <form class="searchBar" role="search">
                                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                                </form>

                            </div>

                            <hr />

                            <div className="container">
                                {categories.filter((category) => {
                                    return search.toLowerCase() == '' ? category
                                        : category.name.toLowerCase().includes(search)
                                        ;
                                }).map((category) => (
                                    <div className="card" key={category._id}>
                                        <div className="card-image">
                                            {category.image && (
                                                <img src={`data:image;base64,${category.image}`} alt="category" className="category-image" />
                                            )}
                                        </div>
                                        <div className="card-content">
                                            <h2>{category.name.toUpperCase()}</h2>                        <p>{category.description}</p>
                                        </div>
                                        <div className="card-actions">
                                            <Link to={`/CategoryWise/${category.name}`} className="button">View Details</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
