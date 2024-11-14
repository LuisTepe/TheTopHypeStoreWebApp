import React from 'react';
import Sidebar from './Sidebar';
import './App.css';

const AdminDashboard = () => {
  // Datos de ejemplo para "Recent Orders"
  const recentOrders = [
    { id_venta: 'ORD001', cliente_nombre: 'John Doe', producto: 'Houston Astros MLB 45 Anniversary Snapback', fecha: '2023-06-10', status: 'Shipped', subtotal: 199.99 },
    { id_venta: 'ORD002', cliente_nombre: 'Jane Smith', producto: 'Chicago Cubs MLB 1990 All-Star Game 59FORTY', fecha: '2023-06-09', status: 'Processing', subtotal: 49.99 },
    { id_venta: 'ORD003', cliente_nombre: 'Bob Johnson', producto: 'Toledo Mud Hens MiLB 9FORTY Adjustable', fecha: '2023-06-08', status: 'Delivered', subtotal: 399.99 },
    { id_venta: 'ORD004', cliente_nombre: 'Alice Brown', producto: 'Colorado Rockies MLB 2023 All-Star Game 9FORTY', fecha: '2023-06-07', status: 'Shipped', subtotal: 129.99 },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="admin-dashboard-container">
        <header className="admin-dashboard-header">
          <div className="flex-container">
            <h1>MyStore Admin</h1>
            <div className="admin-dashboard-header-info">
              <div className="admin-dashboard-avatar">AD</div>
              <div>
                <p>Admin User</p>
                <p>admin@mystore.com</p>
              </div>
            </div>
          </div>
        </header>
        <main className="admin-dashboard-dashboard">
          <DashboardCard title="Total Revenue" icon="💵" value="$45,231.89" percentage="+20.1% from last month" />
          <DashboardCard title="New Customers" icon="👤" value="+2350" percentage="+180.1% from last month" />
          <DashboardCard title="Total Orders" icon="🛒" value="+12,234" percentage="+19% from last month" />
          <DashboardCard title="Products in Stock" icon="📦" value="573" percentage="+201 since last week" />
        </main>
        <section className="admin-dashboard-table-card">
          <h3>Recent Orders</h3>
          <table className="admin-dashboard-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id_venta}</td>
                  <td>{order.cliente_nombre}</td>
                  <td>{order.producto}</td>
                  <td>{order.fecha}</td>
                  <td>
                    <button className="admin-dashboard-status-button">{order.status}</button>
                  </td>
                  <td>${order.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, icon, value, percentage }) => (
  <div className="admin-dashboard-card">
    <div className="header">
      <h3>{title}</h3>
      <span className="icon">{icon}</span>
    </div>
    <div className="value">{value}</div>
    <p className="percentage">{percentage}</p>
  </div>
);

export default AdminDashboard;
