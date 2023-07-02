import React from "react";
import {MdCheckCircleOutline} from "react-icons/md";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    settlementState : string
    settlementId : number
}

const NormalModal: React.FC<ModalProps> = ({isOpen, onClose, settlementState, settlementId}) => {
    const modalClasses = `${
        isOpen ? 'fixed' : 'hidden'
    } top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center`;

    const accept = async () => {
        try{
            const settlementData = {
                id : settlementId,
                settlementState : settlementState
            };

            console.log("settlementData : ",settlementData);

            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/settlement/settlements-status',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settlementData)
            });
            if(response.ok) alert("정산 승인 완료되었습니다.");
            onClose();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        onClose();
    };

    return (
        <div id="defaultModal"  aria-hidden="true"
             className={modalClasses}>
            <div className="relative w-full max-w-md max-h-full ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-6 flex items-center justify-center border-b rounded-t dark:border-gray-600">
                        <MdCheckCircleOutline className="h-9 w-9" />
                    </div>
                    <div className="p-6 space-y-6">

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center justify-center">
                            승인 처리 하시겠습니까?
                        </h3>

                    </div>
                    <div
                        className="text-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="staticModal" type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={accept}>
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