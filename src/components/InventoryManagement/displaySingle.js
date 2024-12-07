import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import './styles/displaySingle.css';
import { Link } from "react-router-dom";

import './styles/Inventory.css'
import Header from './Header';
import NavBar from './NavBar';

export default function DisplaySingle() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProduct();
    }, []);

    function getProduct() {
        axios.get(`http://localhost:8070/products/getImages/${id}`)
            .then((res) => {
                setProduct(res.data.product);
            }).catch((err) => {
                console.error(err);
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

                        <div className="container">
                            <div className="product-details">
                                {product.image && (
                                    <div className="detail image-container">
                                        <h2>{product.name.toUpperCase()}</h2>
                                        <div className="image-frame">
                                            <img src={`data:image;base64,${product.image}`} alt="Product" className="product-image" />
                                        </div>
                                    </div>
                                )}
                                <hr></hr>
                                <div className="detailss">
                                    <div className="detail">
                                        <label>Name:</label>
                                        <span>{product.name}</span>
                                    </div>
                                    <div className="detail">
                                        <label>Quantity:</label>
                                        <span>{product.pid}</span>
                                    </div>
                                    <div className="detail">
                                        <label>Category:</label>
                                        <span>{product.category}</span>
                                    </div>
                                    <div className="detail">
                                        <label>Availability:</label>
                                        <span>{product.availability ? 'Available' : 'Not Available'}</span>
                                    </div>
                                    <div className="detail">
                                        <label>Description:</label>
                                        <span>{product.description}</span>
                                    </div>

                                    <div className="button-container">
                                        <Link to={`/edit/${product._id}`} className="button link-button update">Update</Link>
                                        <Link to={`/AddDisposeItems/${product._id}`} className="button link-button dispose">Dispose Item</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
