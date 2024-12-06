import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles/AllProducts.css'
import total from "./images/total.png";
import lowstock from "./images/lowstock.png";
import { Link } from "react-router-dom";

import './styles/Inventory.css'
import Header from './Header';
import NavBar from './NavBar';


export default function DisposedItemList() {

    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [productLowCount, setProductLowCount] = useState(0);


    useEffect(() => {

        getProducts();
        getCount();
        getLowCount();

    }, []);


    function getProducts() {

        axios.get("http://localhost:8070/products/getDisposed").then((res) => {
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
        axios.put(`http://localhost:8070/products/deleteDisposed/${productId}`)
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

                            <h2>List of Disposed Items</h2>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Disposed Quantity</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>{product.DisposedQty}</td>
                                            <td>{product.category}</td>
                                            <td>
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