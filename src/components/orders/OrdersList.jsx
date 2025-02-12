import React, { useEffect, useState } from "react";
import { Grid, GridColumn as Column, GridEditChangeEvent, GridItemChangeEvent } from "@progress/kendo-react-grid";
import { orderBy } from '@progress/kendo-data-query';
import { useModal } from "../../contexts/ModalContext";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import cable from "../../utils/cable";
import CustomModal from "../modal/CustomeModal";

const initialSort = [{
    field: 'id',
    dir: 'asc'
  }];

const OrdersList = ({setShowModal}) => {
  const [orders, setOrders] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [sort, setSort] = useState(initialSort);

  const [loading, setLoading] = useState(true);

  const { openModal } = useModal();

  useEffect(() => {
    openModal(<p>This is the dynamic content inside the modal!</p>); // Pass dynamic content here
    
    // Fetch initial orders
    fetch("http://localhost:3000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setStatusOptions(data.status_options)
        console.log(data.status_options)
        setLoading(false);
      });


    // Subscribe to ActionCable
    const subscription = cable.subscriptions.create("OrdersChannel", {
      connected: () => {
        console.log("WebSocket is connected!");
      },
      received: (newOrder) => {
        console.log("Received new order:", newOrder);
        alert("New order has arrived");
        setOrders((prevOrders) => [newOrder, ...prevOrders]); // Add new order to the list
      },
      disconnected: () => {
        console.log("WebSocket disconnected!");
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle status change
  const handleStatusChange = (event, order) => {
    debugger
    alert("asd")
    console.log("sadf")
    const newStatus = event.value;

    // Update local state
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      )
    );

    // Send update to API
    fetch(`http://localhost:3000/api/orders/${order.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    }).catch((err) => console.error("Failed to update status:", err));
  };

// TODO: move to Utils
  const getStatusTitle = (id) => {
    return Object.keys(statusOptions).find(key => statusOptions[key] === id)
  };

  const getStatusColor = (statusId) => {
    let backgroundColor = "";
    let title = "";
  
    switch (statusId) {
      case 0:
        backgroundColor = "lightblue";
        title = getStatusTitle(statusId);
        break;
      case 1:
        backgroundColor = "yellow";
        title = getStatusTitle(statusId);
        break;
      case 2:
        backgroundColor = "green";
        title = getStatusTitle(statusId);
        break;
      case 3:
        backgroundColor = "orange";
        title = getStatusTitle(statusId);
        break;
      case 4:
        backgroundColor = "gray";
        title = getStatusTitle(statusId);
        break;
      default:
        backgroundColor = "";
        title = "";
        break;
    }
  
    return { style: { backgroundColor }, title };
  };
  const openCustomModal = () => {
    console.log("Sdf")
    // setShowModal(true)
    return <CustomModal showModal={true}>Message in Modal</CustomModal>;

  }

  const CustomStatus = (props) => {
    const { field, dataItem } = props;
    const status = dataItem[field];
    const cellData = getStatusColor(status);
    // debugger
    return (
      <td style={cellData.style}>
        {cellData.title}
        <button onClick={openCustomModal}>Edit</button>
        {/* <DropDownList
                data={Object.keys(statusOptions)}
                // textField="text"
                defaultValue={cellData.title}
                dataItemKey="value"
                value={cellData.title}
                onChange={handleStatusChange}
                style={cellData.style}
        /> */}




      </td>
    );
  };

  return (
    <div>
      <h2>Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid data={orderBy(orders, sort)}
            style={{ height: "400px" }}
            sortable={true}
            sort={sort}
            // filterable={true}
            resizable={true}
            onSortChange={e => {
                setSort(e.sort)
        }}>
        <Column field="id" title="ID" width="50px" filter="numeric" editable={false}/>
        <Column field="title" title="Title" width="200px" filter="text" editable={false}/>
        <Column field="order_time" title="Order Time" width="150px" filter="date" editable={false}/>
        <Column
            field="status"
            title="Status"
            width="120px"
            editor="numeric"
            cells={{ data: CustomStatus}}
        />
          <Column field="created_at" title="Created At" width="150px" filter="date" editable={false}/>
          <Column field="updated_at" title="Updated At" width="150px" filter="date" editable={false}/>
        </Grid>
      )}
    </div>
  );
};

export default OrdersList;


