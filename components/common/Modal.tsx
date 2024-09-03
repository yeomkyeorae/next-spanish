import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-lg p-1 z-10 relative w-4/5 lg:w-1/2 flex justify-between overflow-auto'>
        <div className='w-full flex flex-col'>
          <div className='flex items-center flex-row-reverse'>
            <button onClick={onClose} className='text-gray-600'>
              &times;
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
