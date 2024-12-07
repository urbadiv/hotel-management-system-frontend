import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles/AllProducts.css'
import total from "./images/total.png";
import lowstock from "./images/lowstock.png";
import { Link, useParams } from 'react-router-dom';

import './styles/Inventory.css'


export default function CategoryWise() {

    const { cat } = useParams();
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

        axios.get(`http://localhost:8070/products/categorySingle/${cat}`).then((res) => {
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

    function deleteCategory(CategoryId) {
        axios.delete(`http://localhost:8070/categorys/delete/${CategoryId}`)
            .then((res) => {
                alert("Category deleted successfully");
            })
            .catch((err) => {
                alert("Error deleting product: " + err.message);
                console.error(err);
            });

        axios.delete(`http://localhost:8070/products/deleteCat/${CategoryId}`)
            .then((res) => {
                alert("Products deleted successfully");
                window.location.href = '/';
            })
            .catch((err) => {
                alert("Error deleting product: " + err.message);
                console.error(err);
            });
    };



    return (
        <div>
            <div class="containerApp">

               

                <div class="content-container">
                    <div>
                        

                        <div className="AllProductContainer">

                            <div className="notify">

                                <div className="notifySub">
                                    <img src={total} />
                                    <Link to={`/admin/AllProducts`} style={{ textDecoration: 'none', color: 'aliceblue' }}>Total Products: {productCount}</Link>
                                </div>

                                <div className="notifySubLowStocked">
                                    <img src={lowstock} />
                                    <Link to={`/admin/LowStockedList`} style={{ textDecoration: 'none', color: 'red' }} >Out of Stock: {productLowCount}</Link>
                                </div>

                                <div className="notifySub">
                                    <img src={total} />
                                    <Link to={`/admin/DamageItemList`} style={{ textDecoration: 'none', color: 'aliceblue' }}>Total Expired Items: {damagedCount}</Link>
                                </div>

                                <div className="notifySub">
                                    <img src={total} />
                                    <Link to={`/admin/DisposedItemList`} style={{ textDecoration: 'none', color: 'aliceblue' }}>Total Disposed Items: {disposedCount}</Link>

                                </div>

                            </div>

                            <div class="button-row">
                                <Link to={`/admin/GenerateReports`} className="button link-button">Generate Reports</Link>
                                <Link to={`/admin/AllProducts`} className="button link-button">Manage Items</Link>
                                <Link to={`/admin/add`} className="button link-button">Add New Items</Link>
                                <Link to={`/admin/AddCategory`} className="button link-button">Add New Category</Link>

                                <form class="searchBar" role="search">
                                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                                </form>

                            </div>


                            <hr />

                            <h2> {cat.toUpperCase()} </h2>


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
                                                <Link to={`/admin/DisplaySingle/${product._id}`} className="button link-button update">View</Link>
                                                <Link to={`/admin/AddDisposeItems/${product._id}`} className="button link-button dispose">Dispose Item</Link>
                                                <button className="button button-delete" onClick={() => deleteProduct(product._id)} >Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button className="button button-delete" onClick={() => deleteCategory(cat)} >Delete</button>



                        </div>

                    </div>
                </div>

            </div>
        </div>

    )

}