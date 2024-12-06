import './App.css';
import Header from './components/InventoryManagement/Header';
import AddProduct from './components/InventoryManagement/AddProduct';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AllProducts from './components/InventoryManagement/AllProducts';
import NavBar from './components/InventoryManagement/NavBar';
import EditProduct from './components/InventoryManagement/EditProduct';
import AddDamageItems from './components/InventoryManagement/AddDamageItems';
import DamageItemList from './components/InventoryManagement/DamagedItemList';
import AddDisposeItems from './components/InventoryManagement/AddDisposeItems';
import DisposedItemList from './components/InventoryManagement/DisposedItemList';
import DisplaySingle from './components/InventoryManagement/displaySingle';
import LowStockedList from './components/InventoryManagement/LowStockedList';
import AddCategory from './components/InventoryManagement/AddCategory';
import AllCategorys from './components/InventoryManagement/AllCategorys';
import CategoryWise from './components/InventoryManagement/CategoryWise';
import GenerateReports from './components/InventoryManagement/GenerateReports';

function App() {
  return (
    <Router>            
            <Routes>
              /** Inventory Management System - Urindu **/
              <Route path="/add" element={<AddProduct />} />
              <Route path="/AllProducts" element={<AllProducts />} />
              <Route path="/edit/:id" element={<EditProduct />} />
              <Route path="/AddDamageItems/:id" element={<AddDamageItems />} />
              <Route path="/DamageItemList" element={<DamageItemList />} />
              <Route path="/AddDisposeItems/:id" element={<AddDisposeItems />} />
              <Route path="/DisposedItemList/" element={<DisposedItemList />} />
              <Route path="/DisplaySingle/:id" element={<DisplaySingle />} /> 
              <Route path="/LowStockedList" element={<LowStockedList />} /> 
              <Route path="/AddCategory" element={<AddCategory />} /> 
              <Route path="/AllCategorys" element={<AllCategorys />} /> 
              <Route path="/CategoryWise/:cat" element={<CategoryWise />} /> 
              <Route path="/GenerateReports" element={<GenerateReports />} /> 
            </Routes>
    </Router>
  );
}

export default App;
