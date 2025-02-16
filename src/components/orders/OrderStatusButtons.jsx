import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import { getStatusColor } from "../../utils/orderUtils";
import { ConfigContext } from "../../contexts/ConfigContext";

const OrderStatusButtons = () => {
    const { statusOptions, handleFilterChange } = useContext(OrderContext);
    const { config } = useContext(ConfigContext);

    return (
        <div className="d-flex gap-2 mb-2">
            {Object.entries(statusOptions).map(([title, key]) => (
                <button style={getStatusColor(key, statusOptions, config.status_map_colors).style}
                key={key} type="button" className="btn" variant="primary" onClick={() => handleFilterChange(key)}>
                    {title}
                </button>
            ))}
        </div>
    );
};
export default OrderStatusButtons;