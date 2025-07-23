import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaBell, FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';

const ReorderAlerts = () => {
  const navigate = useNavigate();
  const { items } = useOutletContext();
  const [alerts, setAlerts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  // Calculate alerts based on actual inventory data
  useEffect(() => {
    if (items.length > 0) {
      const calculatedAlerts = calculateAlertsFromInventory(items);
      setAlerts(calculatedAlerts);
    } else {
      setAlerts([]);
    }
  }, [items]);

  // Function to calculate alerts from inventory data
  const calculateAlertsFromInventory = (inventoryItems) => {
    const alerts = [];
    
    inventoryItems.forEach((item, index) => {
      // Parse quantity and minStock from item data
      const currentStock = parseInt(item.quantity) || 0;
      const minStock = parseInt(item.minStock) || 10; // Default minimum stock
      
      // Calculate urgency level
      let urgency = null;
      let shouldAlert = false;
      
      if (currentStock === 0) {
        urgency = "critical";
        shouldAlert = true;
      } else if (currentStock <= minStock * 0.3) {
        urgency = "critical";
        shouldAlert = true;
      } else if (currentStock <= minStock * 0.6) {
        urgency = "high";
        shouldAlert = true;
      } else if (currentStock <= minStock) {
        urgency = "medium";
        shouldAlert = true;
      }
      
      if (shouldAlert) {
        alerts.push({
          id: item.id || index + 1,
          itemName: item.name || "Unknown Item",
          currentStock: currentStock,
          minStock: minStock,
          supplier: item.supplier || "Unknown Supplier",
          urgency: urgency,
          lastOrdered: item.lastOrdered || "2024-01-01",
          daysSinceOrder: calculateDaysSinceOrder(item.lastOrdered),
          itemData: item // Store full item data for reference
        });
      }
    });
    
    return alerts;
  };

  // Calculate days since last order
  const calculateDaysSinceOrder = (lastOrdered) => {
    if (!lastOrdered) return 30; // Default to 30 days if no date
    
    const lastOrderDate = new Date(lastOrdered);
    const today = new Date();
    const diffTime = Math.abs(today - lastOrderDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Function to get stock status description
  const getStockStatus = (currentStock, minStock) => {
    if (currentStock === 0) return "Out of Stock";
    if (currentStock <= minStock * 0.3) return "Critical Low";
    if (currentStock <= minStock * 0.6) return "Very Low";
    if (currentStock <= minStock) return "Low Stock";
    return "Adequate";
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'critical': return 'Critical';
      case 'high': return 'High';
      case 'medium': return 'Medium';
      default: return 'Low';
    }
  };

  const handleDismiss = (alertId) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const handleReorder = (alert) => {
    // In real app, this would open a reorder form or send to supplier
    const reorderQuantity = Math.max(alert.minStock * 2, 10); // Order 2x min stock or minimum 10
    alert(`Reorder ${alert.itemName} from ${alert.supplier}\nQuantity: ${reorderQuantity}\nCurrent Stock: ${alert.currentStock}\nMin Stock: ${alert.minStock}`);
  };

  const activeAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));
  const criticalAlerts = activeAlerts.filter(alert => alert.urgency === 'critical');
  const highAlerts = activeAlerts.filter(alert => alert.urgency === 'high');
  const mediumAlerts = activeAlerts.filter(alert => alert.urgency === 'medium');

  const displayAlerts = showAll ? activeAlerts : [...criticalAlerts, ...highAlerts];

  // If no items in inventory, show a message and no alerts
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500 text-lg">
        <FaBell className="mx-auto mb-2 text-3xl text-blue-400" />
        No items in inventory.<br />
        Reorder alerts will appear here when you add items.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaBell className="text-2xl text-blue-600" />
            {activeAlerts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeAlerts.length}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Reorder Alerts</h2>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAll ? 'Show Critical Only' : 'Show All Alerts'}
        </button>
      </div>

      {/* Alert Summary */}
      {activeAlerts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="font-semibold text-red-800">Critical</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{criticalAlerts.length}</p>
            <p className="text-sm text-red-600">Out of stock</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="font-semibold text-orange-800">High</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{highAlerts.length}</p>
            <p className="text-sm text-orange-600">Low stock</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-semibold text-yellow-800">Medium</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{mediumAlerts.length}</p>
            <p className="text-sm text-yellow-600">Monitor</p>
          </div>
        </div>
      )}

      {/* Alerts List */}
      <div className="space-y-4">
        {displayAlerts.length === 0 ? (
          <div className="text-center py-8">
            <FaCheck className="text-4xl text-green-500 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No reorder alerts at this time!</p>
            <p className="text-gray-500">All items are well stocked.</p>
          </div>
        ) : (
          displayAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 ${getUrgencyColor(alert.urgency)} bg-gray-50 p-4 rounded-r-lg`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FaExclamationTriangle className={`text-lg ${getUrgencyColor(alert.urgency).replace('bg-', 'text-')}`} />
                    <h3 className="font-semibold text-gray-800 cursor-pointer hover:underline" onClick={() => navigate('/item')}>{alert.itemName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getUrgencyColor(alert.urgency)}`}>
                      {getUrgencyText(alert.urgency)}
                    </span>
                    <span className="text-sm text-gray-600">
                      ({getStockStatus(alert.currentStock, alert.minStock)})
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Current Stock:</span>
                      <span className={`ml-2 font-semibold ${alert.currentStock === 0 ? 'text-red-600' : 'text-gray-800'}`}>
                        {alert.currentStock}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Min Stock:</span>
                      <span className="ml-2 font-semibold text-gray-800">{alert.minStock}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Supplier:</span>
                      <span className="ml-2 font-semibold text-gray-800">{alert.supplier}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Ordered:</span>
                      <span className="ml-2 font-semibold text-gray-800">{alert.daysSinceOrder} days ago</span>
                    </div>
                  </div>
                  
                  {/* Stock Level Indicator */}
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Stock Level:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            alert.currentStock === 0 ? 'bg-red-500' :
                            alert.currentStock <= alert.minStock * 0.3 ? 'bg-red-400' :
                            alert.currentStock <= alert.minStock * 0.6 ? 'bg-orange-400' :
                            'bg-yellow-400'
                          }`}
                          style={{ 
                            width: `${Math.min((alert.currentStock / alert.minStock) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round((alert.currentStock / alert.minStock) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleReorder(alert)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Reorder
                  </button>
                  <button
                    onClick={() => handleDismiss(alert.id)}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    title="Dismiss alert"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dismissed Alerts Summary */}
      {dismissedAlerts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            {dismissedAlerts.length} alert{dismissedAlerts.length !== 1 ? 's' : ''} dismissed
          </p>
        </div>
      )}
    </div>
  );
};

export default ReorderAlerts; 