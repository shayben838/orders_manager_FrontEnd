import { React } from "react";
import { createOrder } from "../../api/orders";

const CreateOrderButton = () => {
  return (
    <button
      onClick={createOrder}
      className="btn btn-outline-secondary"
      type="button"
    >
      <i className="bi bi-plus-lg me-2"></i>
      Create Order
    </button>
  );
};

export default CreateOrderButton;
