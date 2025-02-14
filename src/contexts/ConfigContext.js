import { createContext, useEffect, useState } from "react";
import { getConfigs } from "../api/config";

export const ConfigContext = createContext({});

export const ConfigProvider = ({ children }) => {

    const [config, setConfig] = useState({});

    // useEffect(() => {
    //     const fetchConfigs = async () => {
    //         try {
    //             const configs = await getConfigs();
    //             setConfig(configs);
    //             console.log("Configs:", configs); // Replace with actual usage
    //         } catch (error) {
    //             console.error("Error fetching configs:", error);
    //         }
    //     };

    //     fetchConfigs();
    // }, []);


    return (
        <ConfigContext.Provider value ={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    )
};