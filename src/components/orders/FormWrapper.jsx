import React from "react";
import OrderEditForm from "./Form";

const EditOrder = ({ editData, statusOptions, handleSave }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <OrderEditForm order={editData} statusOptions={statusOptions} handleSave={handleSave} />
        </div>
    );
};

export default EditOrder;
