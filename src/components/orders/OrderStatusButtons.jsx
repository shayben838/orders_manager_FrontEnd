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
// style={getStatusColor(value, statusOptions, config.status_map_colors).style}
export default OrderStatusButtons;



// import { useContext } from "react";
// import { initialSort } from "../../utils/sorting";
// import { OrderContext } from "../../contexts/OrderContext";

// const OrderStatusButtons = ({ statuses }) => {
//     const { setSort, statusOptions } = useContext(OrderContext);

//     const handleSortChange = (status) => {
//         const newSort = [{ field: "status", dir: status }];
//         setSort(newSort);
//     };

//     return (
//         <div className="d-flex gap-2 p-4">
//             {Object.entries(statusOptions).map(([title, key]) => (
//                 <button key={key} variant="primary" onClick={() => handleSortChange(key)}>
//                     {key}
//                 </button>
//             ))}
//         </div>
//     );
// };

// export default OrderStatusButtons;

// import { useContext, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { initialSort } from "../../utils/sorting";
// import { OrderContext } from "../../contexts/OrderContext";

// const OrderStatusButtons = ({ statuses }) => {


//     const { setSort, statusOptions } = useContext(OrderContext)



//     const handleSortChange = (status) => {
//         const newSort = [{ field: "status", dir: status }];
//         setSort(newSort);
//     };

//     return (
//         <div className="flex gap-2 p-4">
//             {statusOptions.map(({ status, count }) => (
//                 <Button key={status} onClick={() => handleSortChange(status)}>
//                     {status} ({count})
//                 </Button>
//             ))}
//         </div>
//     );
// };

// export default OrderStatusButtons;
