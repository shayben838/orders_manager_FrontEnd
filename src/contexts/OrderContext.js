import { createContext, useState, useEffect, useRef } from "react";
import { getOrders, updateOrder, pollNewOrders } from "../api/orders";
import { initialSort } from "../utils/sorting";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [sort, setSort] = useState(initialSort);
  const [editData, setEditData] = useState();

  // understand it better (the whole component)
  // Use useRef for lastId to prevent unnecessary re-renders
  const lastIdRef = useRef(0);
  const pollingRef = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await getOrders();
      setOrders(data.orders);
      setStatusOptions(data.status_options);
      setEditData(data.orders.at(-1));
      lastIdRef.current = data.last_id; // Set lastIdRef, avoiding state update here

      if (!pollingRef.current) {
        startPolling();
      };
    })();

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, []);

  const startPolling = () => {
    if (pollingRef.current) return; // Prevent duplicate intervals

    pollingRef.current = setInterval(async () => {
      try {
        console.log("Polling...");
        const newOrders = await pollNewOrders(lastIdRef.current);
        if (newOrders.length > 0) {
          setOrders((prevOrders) => [...prevOrders, ...newOrders]);
          lastIdRef.current = newOrders.at(-1).id;
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 5000);
  };

  const handleSave = async (updatedOrder) => {
    const data = await updateOrder(updatedOrder);
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === data.id ? data : order))
    );
  };
  console.log(editData)
  return (
    <OrderContext.Provider
      value={{ orders, setOrders, statusOptions, sort, setSort, editData, setEditData, handleSave }}
    >
      {children}
    </OrderContext.Provider>
  );
};
