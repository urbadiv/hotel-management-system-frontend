import React, { useState, useEffect } from "react";
import axios from "axios";

import './styles/Inventory.css'

export default function AddProduct() {
    const [name, setName] = useState("");
    const [pid, setPID] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [rentalPrice, setRentalPrice] = useState("");
    const [image, setImage] = useState(null);
    const [expirationDate, setExpirationDate] = useState(""); // New state for expiration date
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        getcategorys();
    }, []);

    function getcategorys() {
        axios.get("http://localhost:8070/categorys/")
            .then((res) => setCategorys(res.data))
            .catch((err) => alert(err));
    }

    function sendData(e) {
        e.preventDefault();

        if (!name || !pid || !category || !description || !rentalPrice || !image || !expirationDate) {
            alert("Please fill in all fields");
            return;
        }

        if (pid <= 0) {
            alert("Quantity cannot be less than 0");
            return;
        }
        if (rentalPrice <= 0) {
            alert("Rental price cannot be less than 0");
            return;
        }

        axios.get(`http://localhost:8070/products/check/${name}`)
            .then((res) => {
                if (res.data.exists) {
                    alert("Product with this name already exists");
                } else {
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("pid", pid);
                    formData.append("category", category);
                    formData.append("description", description);
                    formData.append("rentalPrice", rentalPrice);
                    formData.append("image", image);
                    formData.append("expirationDate", expirationDate); // Append expiration date

                    axios.post("http://localhost:8070/products/add", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    })
                        .then(() => alert("Product Added!"))
                        .catch((err) => alert(err));
                }
            })
            .catch((err) => alert(err));
    }

    function handleImageChange(e) {
        setImage(e.target.files[0]);
    }

    return (
        <div>
            <div className="containerApp">
               
                <div className="content-container">
                    <div>
                        
                        <div className="containerFrom">
                            <div className="form-container">
                                <h2> Add New Product </h2>
                                <form onSubmit={sendData}>
                                    <div className="mb-3">
                                        <label htmlFor="name">Product Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter Product Name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image">Product Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pid">Product Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="pid"
                                            placeholder="Enter Product QTY"
                                            onChange={(e) => setPID(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description">Product Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            placeholder="Enter Product description"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="rentalPrice">Product Rental Price</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="rentalPrice"
                                            placeholder="Enter Product rentalPrice"
                                            onChange={(e) => setRentalPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="expirationDate">Expiration Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="expirationDate"
                                            onChange={(e) => setExpirationDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="radio">Product Category</label>
                                        {categorys.map((category) => (
                                            <div className="form-check" key={category._id}>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="exampleRadios"
                                                    id={`exampleRadios-${category._id}`}
                                                    value={category.name}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`exampleRadios-${category._id}`}>
                                                    {category.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Add Product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
