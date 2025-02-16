import { createContext, useState } from "react";

export const ConfigContext = createContext({});

export const ConfigProvider = ({ children }) => {

    const [config, setConfig] = useState({});

    return (
        <ConfigContext.Provider value ={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    )
};