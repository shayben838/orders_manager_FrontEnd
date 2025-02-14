// import { createContext } from "react";
// export const OrderContext = createContext([]);

import { createContext, useState, useEffect } from "react";
import { getOrders, updateOrder } from "../api/orders";
import { initialSort } from "../utils/sorting";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [sort, setSort] = useState(initialSort);
  const [editData, setEditData] = useState();

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data.orders);
      setStatusOptions(data.status_options);
      setEditData(data.orders.pop());
    });
  }, []);

  const handleSave = async (updatedOrder) => {
    const data = await updateOrder(updatedOrder);
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === data.id ? data : order))
    );
  };

  return (
    <OrderContext.Provider value={{ orders, setOrders, statusOptions, sort, setSort, editData, setEditData, handleSave }}>
      {children}
    </OrderContext.Provider>
  );
};
