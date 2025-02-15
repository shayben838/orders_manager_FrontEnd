import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getOrders, updateOrder, pollNewOrders } from "../api/orders";
import { initialSort } from "../utils/sorting";
import { getConfigs } from "../api/config";
import { ConfigContext } from "./ConfigContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // State
  const [orders, setOrders] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [sort, setSort] = useState(initialSort);
  const [editData, setEditData] = useState();
  const [loadingOrders, setLoadingOrders] = useState(true);
  // Context
  const { setConfig } = useContext(ConfigContext);
  // Ref
  const lastIdRef = useRef(0);
  const pollingRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getOrders();
        const configs = await getConfigs();
        pollingIntervalRef.current = configs.polling_interval;

        setConfig(configs)
        setOrders(data.orders);
        setStatusOptions(data.status_options);
        setEditData(data.orders.at(-1));
        lastIdRef.current = data.last_id; // Set lastIdRef, avoiding state update here

        if (!pollingRef.current) {
          startPolling();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingOrders(false);
      }

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
    }, pollingIntervalRef.current);
  };

  const handleSave = async (updatedOrder) => {
    const data = await updateOrder(updatedOrder);
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === data.id ? data : order))
    );
  };

  return (
    <OrderContext.Provider
      value={{ orders, setOrders, statusOptions, sort, setSort, editData, setEditData, handleSave, loadingOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};
