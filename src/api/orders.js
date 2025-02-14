// const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = "http://localhost:3000/api/orders";


export const getOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error("Error fetching orders");

    return await response.json();
  } catch (error) {
    console.error("Error fetching new orders:", error);
    return [];
  }
};

export const updateOrder = async (updatedOrder) => {
  try {
    ["id", "created_at", "updated_at", "order_time"].forEach(key => delete updatedOrder[key]);
    const response = await fetch(`${API_BASE_URL}/${updatedOrder.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });

    if (!response.ok) {
      throw new Error("Failed to update order");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating order:", error);
    return []
  }
};

export const pollNewOrders = async (lastOrderId) => {
  try {
  // debugger
    const response = await fetch(`${API_BASE_URL}/poll_new_orders?last_id=${lastOrderId}`);
    if (!response.ok) throw new Error("Error checking new orders");
    // console.log(response.json());
    return await response.json();
  } catch (error) {
    console.error("Error checking new orders:", error);
    return { hasNewOrders: false, latestId: lastOrderId };
  }
};
