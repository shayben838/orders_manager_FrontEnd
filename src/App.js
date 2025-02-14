import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrdersList from "./components/orders/List";
import { OrderProvider } from "./contexts/OrderContext";


function App() {

  return (
    <div className="text-muted fs-6 fw-light">
      {/* TODO: Remove inline style!! */}
      <nav className="navbar navbar-light bg-light ml-1" style={{ marginLeft: "10px" }}>
        <a className="navbar-brand " href="/orders">Orders manager</a>
      </nav>
      <OrderProvider>
        <Router>
          <Routes>
            {/* TODO: Should be element= or component= ? */}
            <Route path="/orders" element={<OrdersList />} />
          </Routes>
        </Router>
      </OrderProvider>
    </div >
  );
}

export default App;
