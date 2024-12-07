import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

import './styles/Inventory.css'
import Header from './Header';
import NavBar from './NavBar';

export default function AddDamageItems() {

    const { id } = useParams();
    const [isDamaged, setisDamaged] = useState("");
    const [qty, setPID] = useState("");
    const [DamagedQty, setDamagedQty] = useState("");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);


    function getProducts() {
        axios.get(`http://localhost:8070/products/get/${id}`)
            .then((res) => {
                setProducts(res.data.product); // Assuming res.data is an array
            }).catch((err) => {
                alert(err);
            });
    }



    function sendData(e) {

        e.preventDefault();

        const newProduct = {

            qty,
            isDamaged,
            DamagedQty

        }

        //if authentication we can add another parameter
        axios.put(`http://localhost:8070/products/addDamage/${id}`, newProduct).then(() => {
            alert("Product Updated!")
        }).catch((err) => {
            alert(err)
        })

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


                        <div className="containerFrom">

                            <div class="form-container">

                                <h2> Add Damaged Quantity </h2>


                                <form onSubmit={sendData}>
                                    <div className="mb-3">
                                        <label for="name" >Product name</label>
                                        <input type="text" className="form-control" id="name" value={products.name} />
                                    </div>

                                    <div className="mb-3">
                                        <label for="pid" >Product Quantity</label>
                                        <input type="number" className="form-control" id="pid" value={products.pid} />
                                    </div>


                                    <div className="mb-3">
                                        <label for="radio" >Product Category</label>
                                        <input type="text" className="form-control" id="pid" value={products.category} />
                                    </div>

                                    <div className="mb-3">
                                        <label for="pid" >Damaged Quantity</label>
                                        <input type="number" className="form-control" id="pid" placeholder="Enter Damaged Quantity" onChange={(e) => {

                                            setDamagedQty(e.target.value);
                                            setisDamaged(true);
                                            setPID(products.pid)


                                        }} />
                                    </div>




                                    <button type="submit" className="btn btn-primary">Add Damaged Item </button>
                                </form>

                            </div>


                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}