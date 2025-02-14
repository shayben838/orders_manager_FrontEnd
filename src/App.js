import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrdersList from "./components/orders/List";
import { startPolling } from "./services/pollOrders";
import { OrderProvider } from "./contexts/OrderContext";
import { getOrders, updateOrder } from "./api/orders";
import { initialSort } from "./utils/sorting";

function App() {
  // const [orders, setOrders] = useState([]);
  // const [statusOptions, setStatusOptions] = useState([]);
  // const [sort, setSort] = useState(initialSort);
  // const [editData, setEditData] = useState()
  // const [pollingStarted, setPollingStarted] = useState(false);

  // useEffect(() => {
  //   getOrders()
  //     .then((data) => {
  //       setOrders(data.orders);
  //       setStatusOptions(data.status_options);
  //       setEditData(data.orders.pop());
  //     });

  // }, []);

  // const handleSave = async (updatedOrder) => {
  //   const data = await updateOrder(updatedOrder);
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) => (order.id === data.id ? data : order))
  //   );
  // };

  return (
    <div className="text-muted fs-6 fw-light">
      {/* TODO: Remove inline style!! */}
      <nav className="navbar navbar-light bg-light ml-1" style={{ marginLeft: "10px" }}>
        <a className="navbar-brand " href="/orders">Orders manager</a>
      </nav>
      <OrderProvider>
      <Router>
          <Routes>
          {/* TODO: Should be element= or component= ? */}
            <Route path="/orders" element={<OrdersList
            // orders={orders}
            // setOrders={setOrders}
            // statusOptions={statusOptions}
            // sort={sort}
            // setSort={setSort}
            // editData={editData}
            // setEditData={setEditData}
            // handleSave={handleSave}
            />}
            // editData={editData}
            />
        </Routes>
      </Router>
      </OrderProvider>
    </div >
  );
}

export default App;















// import React, { useContext, useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import OrdersList from "./components/orders/OrdersList";
// import cable from "../src/utils/cable";
// import { startPolling } from "./services/pollOrders";
// import { OrderContext } from "./contexts/OrderContext";

// const initialSort = [{
//   field: 'id',
//   dir: 'asc'
// }];


// function App() {
//   const [orders, setOrders] = useState([]);
//   // const [orders, setOrders] = useContext([]);
//   const [statusOptions, setStatusOptions] = useState([]);
//   const [sort, setSort] = useState(initialSort);
//   const [editData, setEditData] = useState()

//   // const [loading, setLoading] = useState(true);


//   const [pollingStarted, setPollingStarted] = useState(false);

//   useEffect(() => {
//     // Fetch initial orders
//     fetch("http://localhost:3000/api/orders")
//       .then((res) => res.json())
//       .then((data) => {
//         setOrders(data.orders);
//         setStatusOptions(data.status_options);
//         setEditData(data.orders.pop());
//       });

//     // Start polling after initial fetch
//     // const stopPolling = startPolling(0, setOrders);  // Use 0 or a default ID for initial polling
//     // return () => stopPolling();

//   }, []);  // Run only once on mount

//   // useEffect(() => {
//   //   if (orders.length > 0) {
//   //     const lastOrderId = orders[orders.length - 1]?.id;
//   //     console.log(lastOrderId)
//   //     const stopPolling = startPolling(lastOrderId, setOrders);
//   //     return () => stopPolling();
//   //   }
//   // }, [orders]);  // Track `orders` for polling after fetch




//   // useEffect(() => {

//   //   // Fetch initial orders
//   //   fetch("http://localhost:3000/api/orders")
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       setOrders(data.orders);
//   //       setStatusOptions(data.status_options)
//   //       setEditData(data.orders.pop())
//   //       // setLoading(false);
//   //     });


//   //   // Subscribe to ActionCable
//   //   // const subscription = cable.subscriptions.create("OrdersChannel", {
//   //   //   connected: () => {
//   //   //     console.log("WebSocket is connected!");
//   //   //   },
//   //   //   received: (newOrder) => {
//   //   //     console.log("Received new order:", newOrder);
//   //   //     alert("New order has arrived");
//   //   //     setOrders((prevOrders) => [newOrder, ...prevOrders]); // Add new order to the list
//   //   //   },
//   //   //   disconnected: () => {
//   //   //     console.log("WebSocket disconnected!");
//   //   //   },
//   //   // });

//   //   // return () => {
//   //   //   subscription.unsubscribe();
//   //   // };
//   //   // console.log(data.orders)
//   //   console.log("asdasdasdadsasdads")
//   //   console.log(orders)
//   //   // const stopPolling = startPolling(orders[orders.length - 1]?.id, setOrders);

//   //   // return () => stopPolling();

//   //   // return () => stopPolling();

//   // }, [orders]);

//   const handleSave = (updatedOrder) => {
//     // TODO, save the api endpoint in a global var or something.
//     fetch(`http://localhost:3000/api/orders/${updatedOrder.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedOrder),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.id === data.id ? data : order
//           )
//         );
//       })
//       .catch((error) => {
//         console.error('Error updating order:', error);
//       });
//   };
//   // const 

//   //   useEffect(() => {
//   //     const stopPolling = startPolling(lastOrderId, updateOrders);

//   //     return () => stopPolling();
//   //   }, []);

//   return (
//     <div className="text-muted fs-6 fw-light">
//       {/* TODO: Remove inline style!! */}
//       <nav className="navbar navbar-light bg-light ml-1" style={{ marginLeft: "10px" }}>
//         <a className="navbar-brand " href="/orders">Orders manager</a>
//       </nav>
//       <OrderContext.Provider value={{ orders, setOrders }}>
//       <Router>
//           <Routes>
//           {/* TODO: Should be element= or component= ? */}
//             <Route path="/orders" element={<OrdersList
//               orders={orders}
//               setOrders={setOrders}
//               statusOptions={statusOptions}
//               sort={sort}
//               setSort={setSort}
//               editData={editData}
//               setEditData={setEditData}
//               handleSave={handleSave}
//             />}
//               editData={editData}
//             />
//         </Routes>
//       </Router>
//       </OrderContext.Provider>
//     </div >
//   );
// }

// export default App;

