import { fetchOrdersById } from "../api/orders";

let pollingInterval = null;

export const startPolling = (lastOrderId, fetchNewOrders, interval = 6000) => {
    let isActive = true;

    const checkForNewOrders = async () => {
        console.log("Inside checkForNewOrders")
        const { hasNewOrders, latestId } = await fetchOrdersById(lastOrderId);
        if (isActive && hasNewOrders) {
            lastOrderId.current = latestId;
            fetchNewOrders();
        }
    };

    if (!pollingInterval) {
        pollingInterval = setInterval(checkForNewOrders, interval);
    }

    return () => {
        isActive = false;
        clearInterval(pollingInterval);
        pollingInterval = null;
    };
};
