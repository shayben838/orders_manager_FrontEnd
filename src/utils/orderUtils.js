import { format } from "date-fns";

export const getStatusTitle = (id, statusOptions) => {
    return Object.keys(statusOptions).find(key => statusOptions[key] === id);
};

export const getStatusColor = (statusId, statusOptions) => {
    const statusMap = {
        1: { backgroundColor: "#B3D9FF", title: getStatusTitle(1, statusOptions) }, // Soft blue
        2: { backgroundColor: "#FFF4A3", title: getStatusTitle(2, statusOptions) }, // Soft yellow
        3: { backgroundColor: "#A3E6A3", title: getStatusTitle(3, statusOptions) }, // Soft green
        4: { backgroundColor: "#FFCC99", title: getStatusTitle(4, statusOptions) }, // Soft orange
        5: { backgroundColor: "#D3D3D3", title: getStatusTitle(5, statusOptions) }, // Soft gray
    };

    const status = statusMap[statusId] || { backgroundColor: "", title: "" };
    return { style: { backgroundColor: status.backgroundColor }, title: status.title };
};

export const formatHumanReadableDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "EEE, MMM dd, yyyy hh:mm a");
};

export const formatDateForInput = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().slice(0, 16); // Keep "YYYY-MM-DDTHH:mm"
};
