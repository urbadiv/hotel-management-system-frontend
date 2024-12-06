import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles/AllProducts.css'
import total from "./images/total.png";
import lowstock from "./images/lowstock.png";
import { Link } from "react-router-dom";

import './styles/Inventory.css'
import Header from './Header';
import NavBar from './NavBar';

export default function AllProducts() {

    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [productLowCount, setProductLowCount] = useState(0);
    const [damagedCount, setdamagedCount] = useState(0);
    const [disposedCount, setdisposedCount] = useState(0);
    const [search, setSearch] = useState('');

    useEffect(() => {

        getProducts();
        getCount();
        getLowCount();
        getDamagedCount();
        getDisposedCount();

    }, []);

    function getProducts() {

        axios.get("http://localhost:8070/products/").then((res) => {
            setProducts(res.data);
        }).catch((err) => {
            alert(err)
        })

    }

    function getCount() {

        // Fetch count of products
        axios.get("http://localhost:8070/products/count").then((res) => {
            setProductCount(res.data.count);
        }).catch((err) => {
            alert(err);
        });
    }

    function deleteProduct(productId) {
        axios.delete(`http://localhost:8070/products/delete/${productId}`)
            .then((res) => {
                alert("Product deleted successfully");
                // After successful deletion, refresh the component
                getProducts();
                getCount();
                getLowCount();
            })
            .catch((err) => {
                alert("Error deleting product: " + err.message);
                console.error(err);
            });
    };

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



                            <h2>All Products</h2>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Product Quantity</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.filter((product) => {
                                        return search.toLowerCase() == '' ? product
                                            : product.name.toLowerCase().includes(search)
                                            ;
                                    }).map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>{product.pid}</td>
                                            <td>{product.category}</td>
                                            <td>
                                                <Link to={`/DisplaySingle/${product._id}`} className="button link-button update">View</Link>
                                                <Link to={`/AddDisposeItems/${product._id}`} className="button link-button dispose">Dispose Item</Link>
                                                <button className="button button-delete" onClick={() => deleteProduct(product._id)} >Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>

            </div>
        </div>


    )

}