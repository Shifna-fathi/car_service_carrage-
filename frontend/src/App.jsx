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
import PaymentVoucher from "./pages/PaymentVoucher";
import ReceiptVoucher from "./pages/ReceiptVoucher";
import Ledger from "./pages/Ledger";
import EntityLedger from "./pages/EntityLedger";
import ProfitLossStatement from "./pages/ProfitLossStatement";
import BalanceSheet from "./pages/BalanceSheet";
import TrialBalance from "./pages/TrialBalance";
import CompanyManagement from "./pages/Inventory/CompanyManagement";

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

        {/* Item management routes - admin, manager only */}
        <Route path="item" element={<ProtectedRoute roles={["admin", "manager"]}><ItemTable /></ProtectedRoute>} />
        <Route path="item-form" element={<ProtectedRoute roles={["admin", "manager"]}><ItemFormWrapper /></ProtectedRoute>} />
        {/* Unit management route */}
        <Route path="unit" element={<ProtectedRoute roles={["admin", "manager"]}><UnitManagement /></ProtectedRoute>} />
        {/* Reorder Alerts route */}
        <Route path="reorder-alerts" element={<ProtectedRoute roles={["admin", "manager"]}><ReorderAlerts /></ProtectedRoute>} />
        {/* Vehicle & Customer Management route - admin, manager, technician, receptionist */}
        <Route path="vehicle-customer" element={<ProtectedRoute roles={["admin", "manager", "technician", "receptionist"]}><VehicleManagement /></ProtectedRoute>} />
        {/* Customer Management route - admin, manager, technician, receptionist */}
        <Route path="customers" element={<ProtectedRoute roles={["admin", "manager", "technician", "receptionist"]}><CustomerManagement /></ProtectedRoute>} />
        {/* Insurance, Warranty & Reminders route - admin, manager, technician, receptionist */}
        <Route path="insurance-warranty-reminders" element={<ProtectedRoute roles={["admin", "manager", "technician", "receptionist"]}><InsuranceWarrantyReminders /></ProtectedRoute>} />
        {/* Customer Engagement routes - admin, manager, technician, receptionist */}
        <Route path="customer-preferences" element={<ProtectedRoute roles={["admin", "manager", "technician", "receptionist"]}><CustomerPreferences /></ProtectedRoute>} />
        <Route path="customer-feedback" element={<ProtectedRoute roles={["admin", "manager", "technician", "receptionist"]}><CustomerFeedback /></ProtectedRoute>} />
        <Route path="customer-loyalty-points" element={<ProtectedRoute roles={["admin", "manager", "technician", "receptionist"]}><CustomerLoyaltyPoints /></ProtectedRoute>} />
        {/* Branch management - admin, manager only */}
        <Route path="branch-management" element={<ProtectedRoute roles={["admin", "manager"]}><BranchManagement /></ProtectedRoute>} />
        {/* User management - admin, manager only */}
        <Route path="user-management" element={<ProtectedRoute roles={["admin", "manager"]}><UserManagement /></ProtectedRoute>} />
        {/* Supplier management - admin, manager only */}
        <Route path="supplier-management" element={<ProtectedRoute roles={["admin", "manager"]}><SupplierManagement /></ProtectedRoute>} />
        {/* Barcode generator - admin, manager only */}
        <Route path="barcode-generator" element={<ProtectedRoute roles={["admin", "manager"]}><BarcodeGenerator /></ProtectedRoute>} />
        {/* Warehouse inventory - admin, manager only */}
        <Route path="warehouse-inventory" element={<ProtectedRoute roles={["admin", "manager"]}><WarehouseInventory /></ProtectedRoute>} />
        {/* Service bay inventory - admin, manager only */}
        <Route path="service-bay-inventory" element={<ProtectedRoute roles={["admin", "manager"]}><ServiceBayInventory /></ProtectedRoute>} />
        {/* Job orders - admin, manager only */}
        <Route path="job-orders" element={<ProtectedRoute roles={["admin", "manager"]}><JobOrders /></ProtectedRoute>} />
        {/* Accounts - admin, manager, accountant only */}
        <Route path="payment-voucher" element={<ProtectedRoute roles={["admin", "manager", "accountant"]}><PaymentVoucher /></ProtectedRoute>} />
        <Route path="receipt-voucher" element={<ProtectedRoute roles={["admin", "manager", "accountant"]}><ReceiptVoucher /></ProtectedRoute>} />
        <Route path="ledger" element={<ProtectedRoute roles={["admin", "manager", "accountant"]}><Ledger /></ProtectedRoute>} />
        <Route path="entity-ledger" element={<ProtectedRoute roles={["admin", "manager", "accountant"]}><EntityLedger /></ProtectedRoute>} />
        <Route path="profit-loss-statement" element={<ProtectedRoute roles={["admin", "manager", "accountant"]}><ProfitLossStatement /></ProtectedRoute>} />
        <Route path="balance-sheet" element={<ProtectedRoute roles={["admin", "manager", "accountant"]}><BalanceSheet /></ProtectedRoute>} />
        <Route path="trial-balance" element={<ProtectedRoute roles={["admin", "manager", "accountant"]}><TrialBalance /></ProtectedRoute>} />
        {/* Company management - admin, manager only */}
        <Route path="company-management" element={<ProtectedRoute roles={["admin", "manager"]}><CompanyManagement /></ProtectedRoute>} />
      </Route>

      {/* Global catch all fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
