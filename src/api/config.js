// const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = "http://localhost:3000/api";

export const getConfigs = async () => {
    const errorMsg = "Error fetching configs"
    try {
        const response = await fetch(`${API_BASE_URL}/configs`);
        if (!response.ok) throw new Error(errorMsg)
        return await response.json();
    } catch (error){
        console.log(errorMsg, error)
        return{}
    }
};
