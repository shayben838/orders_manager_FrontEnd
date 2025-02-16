import { format } from "date-fns";

export const getStatusTitle = (id, statusOptions) => {
    return Object.keys(statusOptions).find(key => statusOptions[key] === id);
};

export const getStatusColor = (statusId, statusOptions, status_map_colors) => {
    const statusMap = {
        1: {
            backgroundColor: status_map_colors[1].background_color,
            title: getStatusTitle(1, statusOptions)
        },
        2: {
            backgroundColor: status_map_colors[2].background_color,
            title: getStatusTitle(2, statusOptions)
        },
        3: {
            backgroundColor: status_map_colors[3].background_color,
            title: getStatusTitle(3, statusOptions)
        },
        4: {
            backgroundColor: status_map_colors[4].background_color,
            title: getStatusTitle(4, statusOptions)
        },
        5: {
            backgroundColor: status_map_colors[5].background_color,
            title: getStatusTitle(5, statusOptions)
        },
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
