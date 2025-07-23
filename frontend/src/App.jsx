import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Unauthorized from "./components/Unauthorized";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import ItemForm from "./components/ItemForm";
import ItemTable from "./components/ItemTable";
import Logout from "./components/Logout";
import UnitManagement from "./pages/Inventory/UnitManagement";
import ReorderAlerts from "./components/ReorderAlerts";
import VehicleManagement from "./pages/VehicleCustomer/VehicleManagement";
import CustomerManagement from "./pages/VehicleCustomer/CustomerManagement";
import InsuranceWarrantyReminders from "./pages/VehicleCustomer/InsuranceWarrantyReminders";
import CustomerPreferences from "./pages/VehicleCustomer/CustomerPreferences";
import CustomerFeedback from "./pages/VehicleCustomer/CustomerFeedback";
import CustomerLoyaltyPoints from "./pages/VehicleCustomer/CustomerLoyaltyPoints";
import BranchManagement from "./pages/BranchManagement";
import UserManagement from "./pages/UserManagement";
import SupplierManagement from "./pages/Inventory/SupplierManagement";
import BarcodeGenerator from "./pages/BarcodeGenerator";
import WarehouseInventory from "./pages/WarehouseInventory";
import ServiceBayInventory from "./pages/ServiceBayInventory";
import JobOrders from "./pages/JobOrders";

function ItemFormWrapper() {
  const navigate = useNavigate();

  const handleSave = (item) => {
    console.log("Item saved:", item);
    navigate("/item");
  };

  return <ItemForm onSave={handleSave} />;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/logout" element={<Logout />} />

      {/* Protected Routes wrapped with MainLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Default redirect to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* Shared dashboard route, role passed from localStorage user */}
        <Route
          path="dashboard"
          element={
            <Dashboard
              role={JSON.parse(localStorage.getItem("user"))?.role || "guest"}
            />
          }
        />

        {/* Item management routes */}
        <Route path="item" element={<ItemTable />} />
        <Route path="item-form" element={<ItemFormWrapper />} />
        
        {/* Unit management route */}
        <Route path="unit" element={<UnitManagement />} />
        
        {/* Reorder Alerts route */}
        <Route path="reorder-alerts" element={<ReorderAlerts />} />

        {/* Vehicle & Customer Management route */}
        <Route path="vehicle-customer" element={<VehicleManagement />} />

        {/* Customer Management route */}
        <Route path="customers" element={<CustomerManagement />} />

        {/* Insurance, Warranty & Reminders route */}
        <Route path="insurance-warranty-reminders" element={<InsuranceWarrantyReminders />} />

        {/* Customer Engagement routes */}
        <Route path="customer-preferences" element={<CustomerPreferences />} />
        <Route path="customer-feedback" element={<CustomerFeedback />} />
        <Route path="customer-loyalty-points" element={<CustomerLoyaltyPoints />} />

        {/* Branch management route */}
        <Route path="branch" element={<BranchManagement />} />

        {/* User management route */}
        <Route path="users" element={<UserManagement />} />

        {/* Supplier management route */}
        <Route path="supplier" element={<SupplierManagement />} />

        {/* Barcode generator and reader routes */}
        <Route path="barcode-generator" element={<BarcodeGenerator />} />

        {/* Warehouse and Service Bay inventory routes */}
        <Route path="warehouse-inventory" element={<WarehouseInventory />} />
        <Route path="service-bay-inventory" element={<ServiceBayInventory />} />

        {/* Job orders route */}
        <Route path="job-orders" element={<JobOrders />} />

        {/* Explicit role-based dashboards */}
        {["super_admin", "admin", "manager", "branch_manager", "cashier"].map(
          (role) => (
            <Route
              key={role}
              path={role}
              element={<Dashboard role={role} />}
            />
          )
        )}

        {/* Catch all inside protected layout */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Global catch all fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
