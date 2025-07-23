import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaCube,
  FaTruck,
  FaBuilding,
  FaBarcode,
  FaUsers,
  FaUserShield,
  FaUserTie,
  FaUserCog,
  FaUser,
  FaTools,
  FaCashRegister,
  FaCarSide,
  FaList,
  FaCarAlt,
  FaPaintBrush,
  FaFileInvoice,
  FaClipboardList,
  FaSignOutAlt,
  FaCogs,
  FaDoorOpen,
  FaBell,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  // Dropdown states
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [jobCardOpen, setJobCardOpen] = useState(false);
  const [salesInventoryOpen, setSalesInventoryOpen] = useState(false);
  const [vehicleCustomerOpen, setVehicleCustomerOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setRole(storedUser?.role || "guest");
  }, []);

  const hasFullAccess = ["super_admin", "admin", "manager"].includes(role);

  const navItem = (Icon, label, path) => (
    <li
      key={label}
      className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer transition-colors"
      onClick={() => navigate(path)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(path)}
      role="link"
      aria-label={`Go to ${label}`}
    >
      <Icon className="min-w-[20px]" />
      <span className="truncate max-w-[120px] block relative">
        {label === 'Vehicle & Customer' ? (
          <span style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            animation: 'marquee 6s linear infinite',
            minWidth: '100%',
            position: 'relative',
          }}>
            {label}
          </span>
        ) : label}
      </span>
      <style>{`
        @keyframes marquee {
          0% { left: 0; }
          100% { left: -100%; }
        }
      `}</style>
    </li>
  );

  return (
    <nav className="w-64 h-screen text-white relative flex flex-col shadow-xl select-none">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/car.jpg')", filter: "brightness(0.7)" }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div
          className="flex items-center justify-center py-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 shadow-md text-white text-2xl font-bold cursor-pointer select-none"
          onClick={() => navigate("/dashboard")}
        >
          {/* Logo removed as requested */}
        </div>

        {/* Navigation */}
        <div className="flex-grow bg-blue-900 p-4 overflow-y-auto m-0 rounded-none">
          <ul className="space-y-3">
            {navItem(FaTachometerAlt, "Dashboard", "/dashboard")}
            {navItem(FaBuilding, "Branch", "/branch")}

            {/* Users menu and submenus removed as requested */}
            {/* Vehicle & Customer Management as main menu item with submenu */}
            <li>
              <button onClick={() => setVehicleCustomerOpen(!vehicleCustomerOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3 w-full">
                  <FaCarSide />
                  <span className="text-left w-full">Vehicle & Customer</span>
                </div>
                <span>{vehicleCustomerOpen ? "▲" : "▼"}</span>
              </button>
              {vehicleCustomerOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded text-left">
                  {/* Vehicle Management with marquee effect */}
                  <li className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer transition-colors" onClick={() => navigate("/vehicle-customer")}
                      tabIndex={0} onKeyDown={e => e.key === "Enter" && navigate("/vehicle-customer")}
                      role="link" aria-label="Go to Vehicle Management">
                    <FaCarSide className="min-w-[20px]" />
                    <span className="truncate max-w-[120px] block relative">
                      <span style={{
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        animation: 'marquee 6s linear infinite',
                        minWidth: '100%',
                        position: 'relative',
                      }}>
                        Vehicle Management
                      </span>
                    </span>
                    <style>{`
                      @keyframes marquee {
                        0% { left: 0; }
                        100% { left: -100%; }
                      }
                    `}</style>
                  </li>
                  {/* Customer Engagement submenu */}
                  <li>
                    <button className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/20 active:bg-white/30 w-full text-left" style={{ width: '100%' }}>
                      <FaUsers className="min-w-[20px]" />
                      <span className="w-full text-left">Customer Engagement</span>
                    </button>
                    <ul className="pl-8 pt-2 space-y-2 text-white/90 bg-white/5 rounded text-left">
                      {/* Preferences submenu with marquee */}
                      <li className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer transition-colors" onClick={() => navigate("/customer-preferences")}
                          tabIndex={0} onKeyDown={e => e.key === "Enter" && navigate("/customer-preferences")}
                          role="link" aria-label="Go to Preferences">
                        <FaCogs className="min-w-[20px]" />
                        <span className="truncate max-w-[120px] block relative">
                          <span style={{
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            animation: 'marquee 6s linear infinite',
                            minWidth: '100%',
                            position: 'relative',
                          }}>
                            Preferences
                          </span>
                        </span>
                      </li>
                      {/* Feedback submenu with marquee */}
                      <li className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer transition-colors" onClick={() => navigate("/customer-feedback")}
                          tabIndex={0} onKeyDown={e => e.key === "Enter" && navigate("/customer-feedback")}
                          role="link" aria-label="Go to Feedback">
                        <FaClipboardList className="min-w-[20px]" />
                        <span className="truncate max-w-[120px] block relative">
                          <span style={{
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            animation: 'marquee 6s linear infinite',
                            minWidth: '100%',
                            position: 'relative',
                          }}>
                            Feedback
                          </span>
                        </span>
                      </li>
                      {/* Loyalty Points submenu with marquee */}
                      <li className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer transition-colors" onClick={() => navigate("/customer-loyalty-points")}
                          tabIndex={0} onKeyDown={e => e.key === "Enter" && navigate("/customer-loyalty-points")}
                          role="link" aria-label="Go to Loyalty Points">
                        <FaUserTie className="min-w-[20px]" />
                        <span className="truncate max-w-[120px] block relative">
                          <span style={{
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            animation: 'marquee 6s linear infinite',
                            minWidth: '100%',
                            position: 'relative',
                          }}>
                            Loyalty Points
                          </span>
                        </span>
                      </li>
                    </ul>
                  </li>
                  {navItem(FaCogs, "Insurance, Warranty & Reminders", "/insurance-warranty-reminders")}
                </ul>
              )}
            </li>
            {/* Inventory */}
            {hasFullAccess && (
              <li>
                <button onClick={() => setInventoryOpen(!inventoryOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                  <div className="flex items-center gap-3">
                    <FaBox />
                    <span>Inventory</span>
                  </div>
                  <span>{inventoryOpen ? "▲" : "▼"}</span>
                </button>
                {inventoryOpen && (
                  <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                    {navItem(FaCube, "Item", "/item")}
                    {navItem(FaBox, "Unit", "/unit")}
                    {navItem(FaBell, "Reorder Alerts", "/reorder-alerts")}
                    {navItem(FaTruck, "Supplier", "/supplier")}
                    {navItem(FaBuilding, "Company", "/company")}
                    <li className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer transition-colors" onClick={() => navigate("/barcode-generator")}
                        tabIndex={0} onKeyDown={e => e.key === "Enter" && navigate("/barcode-generator")}
                        role="link" aria-label="Go to Barcode Generator">
                      <FaBarcode className="min-w-[20px]" />
                      <span className="truncate max-w-[160px] block relative">
                        <span style={{
                          display: 'inline-block',
                          whiteSpace: 'nowrap',
                          animation: 'marquee 6s linear infinite',
                          minWidth: '100%',
                          position: 'relative',
                        }}>
                          Barcode Generator
                        </span>
                      </span>
                    </li>
                    {navItem(FaClipboardList, "Job Orders", "/job-orders")}
                    <li className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer transition-colors" onClick={() => navigate("/warehouse-inventory")}
                        tabIndex={0} onKeyDown={e => e.key === "Enter" && navigate("/warehouse-inventory")}
                        role="link" aria-label="Go to Warehouse Inventory">
                      <FaBox className="min-w-[20px]" />
                      <span className="truncate max-w-[160px] block relative">
                        <span style={{
                          display: 'inline-block',
                          whiteSpace: 'nowrap',
                          animation: 'marquee 6s linear infinite',
                          minWidth: '100%',
                          position: 'relative',
                        }}>
                          Warehouse Inventory
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer transition-colors" onClick={() => navigate("/service-bay-inventory")}
                        tabIndex={0} onKeyDown={e => e.key === "Enter" && navigate("/service-bay-inventory")}
                        role="link" aria-label="Go to Service Bay Inventory">
                      <FaTools className="min-w-[20px]" />
                      <span className="truncate max-w-[160px] block relative">
                        <span style={{
                          display: 'inline-block',
                          whiteSpace: 'nowrap',
                          animation: 'marquee 6s linear infinite',
                          minWidth: '100%',
                          position: 'relative',
                        }}>
                          Service Bay Inventory
                        </span>
                      </span>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Keep only Logout at the bottom */}
            {navItem(FaSignOutAlt, "Logout", "/logout")}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
