import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { Theme } from '@/lib/types';
import { useEffect, useState } from 'react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme: Theme;
    autoCloseTime?: number; // Time in seconds
}

export const SuccessModal = ({ isOpen, onClose, theme, autoCloseTime = 3 }: SuccessModalProps) => {
    const [countdown, setCountdown] = useState(autoCloseTime);

    useEffect(() => {
        if (isOpen) {
            setCountdown(autoCloseTime); // eslint-disable-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isOpen, autoCloseTime]);

    useEffect(() => {
        if (isOpen && countdown === 0) {
            onClose();
        }
    }, [isOpen, countdown, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative w-full max-w-md p-8 rounded-3xl border shadow-2xl ${theme.colors.surface} ${theme.colors.border} flex flex-col items-center text-center`}
                        >
                            <button
                                onClick={onClose}
                                className={`absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-black/5 ${theme.colors.subtext}`}
                            >
                                <X size={20} />
                            </button>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: 360 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                                className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${theme.colors.surfaceHighlight}`}
                            >
                                <CheckCircle size={40} className="text-green-500" />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className={`text-2xl font-bold mb-2 ${theme.colors.highlight}`}
                            >
                                Message Sent!
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className={`mb-8 ${theme.colors.subtext}`}
                            >
                                Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                            </motion.p>

                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden mb-2">
                                <motion.div
                                    initial={{ width: '100%' }}
                                    animate={{ width: '0%' }}
                                    transition={{ duration: autoCloseTime, ease: 'linear' }}
                                    className={`h-full ${theme.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa]' : 'bg-[#1e66f5]'}`}
                                />
                            </div>

                            <p className={`text-xs ${theme.colors.subtext} opacity-60`}>
                                Closing in {countdown}s
                            </p>

                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
