import { createContext, useContext, useState, useEffect, useRef } from "react";
import { filterBy } from '@progress/kendo-data-query';
import { getOrders, updateOrder, pollNewOrders } from "../api/orders";
import { initialSort } from "../utils/sorting";
import { initialFilter } from "../utils/filtering";
import { getConfigs } from "../api/config";
import { ConfigContext } from "./ConfigContext";


export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // State
  const [orders, setOrders] = useState([]);
  const [filterOrders, setFilteredOrders] = useState([]);
  // setFilteredOrders
  const [statusOptions, setStatusOptions] = useState([]);
  const [sort, setSort] = useState(initialSort);
  const [filter, setFilter] = useState(initialFilter)
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
        const filteredOrders = filterBy(data.orders, filter);
        setOrders(data.orders);
        setFilteredOrders(filteredOrders)
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

  useEffect(() => {
    setFilteredOrders(filterBy(orders, filter));
  }, [orders, filter]); // Runs whenever `orders` or `filter` changes


  const startPolling = () => {
    if (pollingRef.current) return; // Prevent duplicate intervals

    pollingRef.current = setInterval(async () => {
      try {
        console.log("Polling...");
        const newOrders = await pollNewOrders(lastIdRef.current);

        if (newOrders.length > 0) {
          updateOrders(newOrders);
          lastIdRef.current = newOrders.at(-1).id; // Update lastId safely
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, pollingIntervalRef.current);
  };

  const updateOrders = (newOrders) => {
    setOrders((prevOrders) => [...prevOrders, ...newOrders]); // Only update orders
  };

  const handleSave = async (updatedOrder) => {
    try {
      const data = await updateOrder(updatedOrder); // Update backend

      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) =>
          order.id === data.id ? data : order
        );

        return updatedOrders;
      });
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };


  const handleFilterChange = (status) => {
    const newFilter = {
      logic: "and",
      filters: [
        {
          field: "status",
          operator: "eq",
          value: status  // Change value dynamically
        }
      ]
    };
    setFilter(newFilter);
    const filteredOrders = filterBy(orders, newFilter);
    setFilteredOrders(filteredOrders);
  }

  return (
    <OrderContext.Provider
      value={{
        orders, setOrders,
        statusOptions,
        sort, setSort,
        editData, setEditData, handleSave,
        loadingOrders, filter, setFilter,
        filterOrders, setFilteredOrders, handleFilterChange
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
