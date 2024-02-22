import './LoadingModal.css'; // Add CSS for styling
import Image from 'next/image';

const LoadingModal = ({ open } : { open: Boolean }) => {
    return (
        <div
            className={`fixed ${open ? "" : "hidden"
                } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mx-auto`}
        >
            <div className="relative top-50 mx-auto p-5 w-3/4 rounded-md h-full overflow-hidden">
                <div className="ring">
                    <p>Loading</p>
                    <span className='spinner'></span>
                </div>
            </div>
        </div>
    );
};

export default LoadingModal;