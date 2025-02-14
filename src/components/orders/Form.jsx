import React, { useState, useEffect } from "react";
import { formatHumanReadableDate, getStatusColor } from "../../utils/orderUtils";

const OrderEditForm = ({ order = {}, statusOptions, handleSave }) => {
    const [formData, setFormData] = useState({
        id: order.id || "",
        title: order.title || "",
        order_time: order.order_time || "",
        status: order.status || "",
        created_at: order.created_at || new Date().toISOString(),
        updated_at: order.updated_at || new Date().toISOString(),
    });
    // console.log(statusOptions)
    useEffect(() => {
        setFormData({
            id: order.id || "",
            title: order.title || "",
            order_time: order.order_time || "",
            status: order.status || "",
            created_at: order.created_at || new Date().toISOString(),
            updated_at: order.updated_at || new Date().toISOString(),
        });
    }, [order]); // Updates state when `order` changes


    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
    };
    // TODO: It should be an helper function
    const getStatusName = (value) => {
        return Object.entries(statusOptions).find(([key, val]) => val === value)?.[0] || "Select Status";
    };

    const formatDateForInput = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return date.toISOString().slice(0, 16); // Keep "YYYY-MM-DDTHH:mm"
    };



    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
            <h3 className="mb-4 fw-bold">Update Order</h3>

            <div className="mb-3">
                <label className="form-label fw-medium">ID</label>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    disabled
                    className="form-control bg-light"
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-medium">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    disabled
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-medium">Order Time</label>
                <input
                    type="datetime-local"
                    name="order_time"
                    value={formatDateForInput(formData.order_time)}
                    disabled
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-medium">Status</label>
                <div className="dropdown">
                    <button
                        className={`btn dropdown-toggle`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={getStatusColor(formData.status, statusOptions).style} // Apply color to the button
                    >
                        {getStatusName(formData.status)}
                    </button>
                    <ul className="dropdown-menu">
                        {Object.entries(statusOptions).map(([key, value]) => (
                            <li key={key}>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setFormData((prevData) => ({ ...prevData, status: value }))}
                                    style={getStatusColor(value, statusOptions).style} // Apply color to each dropdown item
                                >
                                    {key}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="text-muted small text-end mt-4" style={{ fontSize: "0.6rem" }}>
                <div>Ordered At: {formatHumanReadableDate(formatDateForInput(formData.created_at))}</div>
                <div>Updated At: {formatHumanReadableDate(formatDateForInput(formData.updated_at))}</div>
            </div>
        </form>
    );
};

export default OrderEditForm;
