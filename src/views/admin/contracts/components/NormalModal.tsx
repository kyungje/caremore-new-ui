import React from "react";
import {MdCheckCircleOutline} from "react-icons/md";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    statusName : string
}

const NormalModal: React.FC<ModalProps> = ({isOpen, onClose, statusName}) => {
    const modalClasses = `${
        isOpen ? 'fixed' : 'hidden'
    } top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center`;

    return (
        <div id="defaultModal"  aria-hidden="true"
             className={modalClasses}>
            <div className="relative w-full max-w-md max-h-full ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-6 flex items-center justify-center border-b rounded-t dark:border-gray-600">
                        <MdCheckCircleOutline className="h-9 w-9" />
                        {statusName === '클레임' ? '  클레임을 작성 하시겠습니까?' : null}
                    </div>
                    <div className="p-6 space-y-6">
                        {statusName !== '클레임' ?
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center justify-center">
                                {statusName} 처리 하시겠습니까?
                            </h3>
                            :
                            <textarea id="comment"
                                  className="w-full px-0 text-sm text-gray-900 bg-white border-d dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                  placeholder="클레임 작성..." required></textarea>}
                    </div>
                    <div
                        className="text-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="staticModal" type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={onClose}>
                            확인
                        </button>
                        <button data-modal-hide="staticModal" type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                onClick={onClose}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NormalModal;