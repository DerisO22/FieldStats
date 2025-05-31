import { useEffect, ReactNode } from "react";
import './component_styles/modal.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal_overlay" onClick={onClose}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <div className="modal_header">
                    {title && <h2 className="modal_title">{title}</h2>}
                    <div className="modal_exit_container">
                        <button className="modal_close_button" onClick={onClose}>
                            ×
                        </button>
                    </div>
                </div>
                <div className="modal_body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;