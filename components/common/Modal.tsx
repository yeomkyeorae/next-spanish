import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='fixed inset-0' onClick={onClose}></div>
      <div className='bg-white rounded-lg shadow-lg p-6 z-10 relative w-3/4 lg:w-1/2'>
        <button onClick={onClose} className='absolute top-0 right-0 mt-4 mr-4 text-gray-600'>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
