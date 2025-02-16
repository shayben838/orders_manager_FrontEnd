import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrdersList from "./components/orders/List";
import { OrderProvider } from "./contexts/OrderContext";
import { ConfigProvider } from "./contexts/ConfigContext";

function App() {
  return (
    <div className="text-muted fs-6 fw-light">
      {/* TODO: Remove inline styles!! */}
      <nav className="navbar navbar-light bg-light ml-1" style={{ marginLeft: "10px" }}>
        <a className="navbar-brand " href="/orders">Orders manager</a>
      </nav>
      < ConfigProvider>
        <OrderProvider>
          <Router>
            <Routes>
              <Route path="/" element={<OrdersList />} />
            </Routes>
          </Router>
        </OrderProvider>
      </ConfigProvider>
    </div >
  );
}

export default App;
