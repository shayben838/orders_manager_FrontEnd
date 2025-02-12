import React, { createContext, useState, useContext } from "react";

// Create a context for the modal
const ModalContext = createContext();

// ModalProvider component that provides context values to children
export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => {
        setModalContent(content);
        setIsOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent }}>
            {children}
        </ModalContext.Provider>
    );
};

// Custom hook to access the modal context
export const useModal = () => {
    return useContext(ModalContext);
};
