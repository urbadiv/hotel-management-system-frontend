import React, { useState, useEffect } from "react";
import axios from "axios" ;
import { useParams } from 'react-router-dom';


export default function AddProduct() {

    const {id} = useParams();
    const [name, setName] = useState("");
    const [pid, setPID] = useState("");
    const [category, setCategory] = useState("");
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        getProducts();
        getcategorys();
    }, []); 

    
    function getProducts() {
        axios.get(`http://localhost:8070/products/get/${id}`)
           .then((res) => {
                setName(res.data.product.name);
                setPID(res.data.product.pid);
                setCategory(res.data.product.category);
            }).catch((err) => {
                alert(err);
            });
        }

    function sendData(e){

        e.preventDefault();

        const newProduct = {

            name,
            pid,
            category

        }

        //if authentication we can add another parameter
        axios.put(`http://localhost:8070/products/update/${id}`, newProduct ).then(() => {
            alert("Product Updated!")
        }).catch((err) => {
            alert(err)
        })

    }

    
    function getcategorys(){

        axios.get("http://localhost:8070/categorys/").then((res) => {
            setCategorys(res.data);
        }).catch((err) => {
            alert(err)
        })

    }


    return (

        <div className="containerFrom">

        <div class="form-container">

            <h2> Edit Product </h2>


        <form onSubmit={sendData}> 
            <div className="mb-3">
                <label for="name" >Product name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => {

                    setName(e.target.value);

                }}/>
            </div>
            
            <div className="mb-3">
                <label for="pid" >Product Quantity</label>
                <input type="number" className="form-control" id="pid" value={pid} onChange={(e) => {

                    setPID(e.target.value);

                }} />
            </div>

           
            <div className="mb-3">
            <label for="radio" >Product Category</label>
            <input type="text" className="form-control" id="pid" value={category} />
                {categorys.map((category) => (
                        <div className="form-check" key={category._id}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id={`exampleRadios-${category._id}`}
                                value={category.name}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                            />
                            <label className="form-check-label" htmlFor={`exampleRadios-${category._id}`}>
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>

            <button type="submit" className="btn btn-primary">Update Product</button>
        </form>

    </div>

        </div>
    )
}