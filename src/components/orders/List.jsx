import React, { useContext } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { orderBy } from '@progress/kendo-data-query';

import EditOrder from "./FormWrapper";
import { OrderContext } from "../../contexts/OrderContext";
import { getStatusColor, formatHumanReadableDate } from "../../utils/orderUtils";
import { ConfigContext } from "../../contexts/ConfigContext";
import OrderStatusButtons from "./OrderStatusButtons";
import CreateOrderButton from "./CreateOrderButton";



const OrdersList = () => {
  const {
    statusOptions,
    sort,
    setSort,
    editData,
    setEditData,
    handleSave,
    loadingOrders,
    filter,
    setFilter,
    filterOrders
  } = useContext(OrderContext);

  const { config } = useContext(ConfigContext);

  const openEditing = (e) => {
    console.log(e.dataItem)
    setEditData(e.dataItem)
  }

  const CustomStatus = (props) => {
    const { field, dataItem } = props;
    const status = dataItem[field];
    const cellData = getStatusColor(status, statusOptions, config.status_map_colors);
    // debugger
    return (
      <td style={cellData.style} >
        <div className="row">
          <div className="col-6">
            {cellData.title}
          </div>
          <div className="col-3 ml-3" style={{ marginLeft: "5px" }}>
            <i className="bi bi-pen " type="button" onClick={() => openEditing(props)}></i>
          </div>
        </div>
      </td>
    );
  };
  const height = "300px"
  return (
    <div>
      {loadingOrders === true ? (
        <p>Loading...</p>
      ) : (
          <div className="container m-1 p-1">
            <div className="row" >
              <div className="col-8">

                <OrderStatusButtons />
              </div>
              <div className="col-4">

                <CreateOrderButton />
              </div>
            </div>

            <div className="row d-flex" style={{ height: height }}>
              <div className="col-8 d-flex flex-column">
                <Grid
                  data={orderBy(filterOrders, sort)}
                  style={{ flexGrow: 1, height: height }}
                  sort={sort}
                  sortable={true}
                  onSortChange={e => setSort(e.sort)}
                  resizable={true}
                  filter={filter}
                // filterable={true}
                  onFilterChange={(e) => setFilter(e.filter)}
                >
                  <Column
                    field="id"
                  title="ID"
                    width="150px"
                  filter="numeric"
                    editable={false}
                  />
                  <Column
                    field="title"
                  title="Title"
                    width="250px"
                  filter="text"
                    editable={false}
                  />
                  <Column
                    field="status"
                    title="Status"
                    width="120px"
                    editor="numeric"
                    filter="numeric"
                    cells={{ data: CustomStatus }}
                  />
                  <Column
                    field="order_time"
                    title="Ordered at"
                    width="150px"
                  filter="date"
                  editable={false}
                  cell={(props) => (
                    <td className="text-muted small">{formatHumanReadableDate(props.dataItem.order_time)}</td>
                  )}
                  />
                <Column
                  field="updated_at"
                    title="Updated At"
                    width="150px"
                  filter="date"
                    cell={(props) => (
                      <td className="text-muted small">{formatHumanReadableDate(props.dataItem.updated_at)}</td>
                    )}
                    editable={false}
                  />
              </Grid>
            </div>

              <div className="col-4 d-flex flex-column">
              <EditOrder
                editData={editData}
                statusOptions={statusOptions}
                  handleSave={handleSave}
                  style={{ flexGrow: 1 }}  // Allow EditOrder to grow if needed
                />
              </div>
          </div>
        </div>


      )}
    </div>
  );
};

export default OrdersList;


