import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "../components/Modal.tsx";

interface ModalContextType {
    openModal: (content: ReactNode, title?: string) => void;
    closeModal: () => void;
    isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);

    if(!context){
        throw new Error('useModal must be used within a ModelProp');
    }

    return context;
}

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);
    const [title, setTitle] = useState<string | undefined>(undefined);

    const openModal = (modalContent: ReactNode, modalTitle?: string) => {
        setContent(modalContent);
        setTitle(modalTitle);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
        setTitle(undefined);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
            {children}
            <Modal isOpen={isOpen} onClose={closeModal} title={title}>
                {content}
            </Modal>
        </ModalContext.Provider>
    );
};