import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./styles/AllProducts.css";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import reportImage from "./images/nilameLogo.png";

import './styles/Inventory.css'


export default function GenerateReports() {
    const [products, setProducts] = useState([]);
    const [showLowStock, setShowLowStock] = useState(false); // State for low stocked items filter
    const [showDamaged, setShowDamaged] = useState(false); // State for damaged items filter
    const [showDisposed, setShowDisposed] = useState(false); // State for damaged items filter
    const componentPDF = useRef();

    useEffect(() => {
        getProducts();
    }, []);

    const GeneratePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: generateDocumentTitle(),
        onAfterPrint: () => alert("Data Saved in PDF"),
    });

    function getProducts() {
        axios
            .get("http://localhost:8070/products/")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }

    function generateDocumentTitle() {
        let title = "Inventory Report";
        if (showLowStock) {
            title += " - Low Stock";
        }
        if (showDamaged) {
            title += " - Expired Items";
        }
        if (showDisposed) {
            title += " - Disposed Items";
        }
        return title;
    }



    return (
        <div>
            <div class="containerApp">


                <div class="content-container">
                    <div>
                        <h1> Inventory Management System </h1>
                        <hr className="big" />

                        <div className="AllProductContainer">
                            <h2>{generateDocumentTitle()}</h2>
                            <br />
                            <div className="filters">
                                {/* Checkbox to filter low stocked items */}
                                <label className="filterCheckbox">
                                    <input
                                        type="checkbox"
                                        checked={showLowStock}
                                        onChange={() => setShowLowStock(!showLowStock)}
                                    />
                                    Low Stock Items
                                </label>
                                {/* Checkbox to filter damaged items */}
                                <label className="filterCheckbox">
                                    <input
                                        type="checkbox"
                                        checked={showDamaged}
                                        onChange={() => setShowDamaged(!showDamaged)}
                                    />
                                    Expired Items
                                </label>
                                <label className="filterCheckbox">
                                    <input
                                        type="checkbox"
                                        checked={showDisposed}
                                        onChange={() => setShowDisposed(!showDisposed)}
                                    />
                                    Disposed Items
                                </label>
                            </div>
                            <div ref={componentPDF} style={{ width: "100%" }}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Product Quantity</th>
                                            <th>Category</th>
                                            {showDamaged }
                                            {showDisposed && <th>Disposed Quantity</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products
                                            .filter((product) => {
                                                // Filter based on low stock
                                                if (showLowStock) {
                                                    return product.pid < 10; // Assuming 10 as the threshold for low stock
                                                }
                                                return true; // Show all if filter is not active
                                            })
                                            .filter((product) => {
                                                // Filter based on damaged
                                                if (showDamaged) {
                                                    return product.isExpired; // Assuming damaged flag is present in product object
                                                }
                                                return true; // Show all if filter is not active
                                            })
                                            .filter((product) => {
                                                // Filter based on damaged
                                                if (showDisposed) {
                                                    return product.isDisposed; // Assuming damaged flag is present in product object
                                                }
                                                return true; // Show all if filter is not active
                                            })
                                            .map((product) => (
                                                <tr key={product._id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.pid}</td>
                                                    <td>{product.category}</td>
                                                    {showDamaged}
                                                    {showDisposed && <td>{product.DisposedQty}</td>}
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={GeneratePDF}>
                                Print Report
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
