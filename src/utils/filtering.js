export const initialFilter = {
    logic: "and",
    filters: [
        {
            field: "status",
            operator: "eq",  // Equals
            value: 1 // Filtering orders where status === 1
        }
    ]
};
