import { fetchOrdersById } from "../api/orders";

let pollingInterval = null;

export const startPolling = (lastOrderId, fetchNewOrders, interval = 6000) => {
    let isActive = true;

    const checkForNewOrders = async () => {
        console.log("Inside checkForNewOrders")
        // TODO: Change the last id
        console.log(lastOrderId)
        const { hasNewOrders, latestId } = await fetchOrdersById(lastOrderId);
        console.log(hasNewOrders)
        // debugger
        if (isActive && hasNewOrders) {
            lastOrderId.current = latestId; // Update last order ID
            fetchNewOrders(); // Fetch new orders if available
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
