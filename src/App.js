import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrdersIndex from "./components/orders/OrdersList";

import { ModalProvider } from "./contexts/ModalContext";
import ModalComponent from "./components/modal/Modal";
import CustomModal from "./components/modal/CustomeModal";
import { useState } from "react";

function App() {


  const [showModal, setShowModal] = useState(false)


  return (
    <ModalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ModalComponent />} />
          {/* TODO: Should be element= or component= ? */}
          <Route path="/orders" element={<OrdersIndex setShowModal={setShowModal} />} />
        </Routes>
      </Router>

      < CustomModal showModal={showModal} />
    </ModalProvider >
  );
}

export default App;



// import React from "react";
// import { ModalProvider } from "./ModalContext"; // Import ModalProvider
// import ModalComponent from "./Modal"; // Import the ModalComponent
// import SomeOtherComponent from "./SomeOtherComponent"; // A component that triggers the modal
// import OrdersList from "./components/orders/OrdersList";

// const App = () => {
//   return (
//     <ModalProvider>
//       <div>
//         <h1>My App</h1>
//         <OrdersList />
//         <ModalComponent /> {/* Render the modal component here */}
//       </div>
//     </ModalProvider>
//   );
// };