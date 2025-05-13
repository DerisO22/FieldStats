import { useEffect, useState } from "react"
import './component_styles/popup_notification.css'

interface NotificationProps {
    isVisible: boolean
    message: string,
    type?: 'success' | 'error' | 'info',
    duration: number
    onClose: () => void
}

const PopUpNotification = ({isVisible = true, message, type = 'info', duration = 3000, onClose}: NotificationProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, duration)

        return () => clearTimeout(timer);
    }, [duration, onClose])

    if (!isVisible) return null;

    return (
        <div className={`popup_notification ${type}`}>
            <p>{message}</p>
            <button 
                className="close_button" 
                onClick={() => {
                    onClose?.();
                }}
            >
                ×
            </button>
        </div>
    )
}

export default PopUpNotification;