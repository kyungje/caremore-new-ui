import React, {useState} from "react";
import {MdCheckCircleOutline} from "react-icons/md";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HelperModal: React.FC<ModalProps> = ({isOpen, onClose}) => {
    const [helperId, setHelperId] = useState('');
    const [helperName, setHelperName] = useState('');
    const [helperPhoneNumber, setHelperPhoneNumber] = useState('');
    const [helperJobType, setHelperJobType] = useState('');
    const [location, setLocation] = useState('');
    const [expense, setExpense] = useState('');

    const modalClasses = `${
        isOpen ? 'fixed' : 'hidden'
    } top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center`;

    const handleHelperIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHelperId(e.target.value);
    };
    const handleHelperNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHelperName(e.target.value);
    };
    const handleHelperPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHelperPhoneNumber(e.target.value);
    };
    const handleHelperJobTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHelperJobType(e.target.value);
    };
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };
    const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpense(e.target.value);
    };

    const helperRegister = async () => {
        try{
            const helperData = {
                helperId : helperId,
                helperName : helperName,
                helperPhoneNumber : helperPhoneNumber,
                helperJobType : helperJobType,
                location : location,
                expense : expense,
                status : "구직"
            };

            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/helper/HelperOffers',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(helperData)
            });
            if(response.ok) alert("도우미 등록이 완료되었습니다.");
            onClose();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div id="defaultModal"  aria-hidden="true"
             className={modalClasses}>
            <div className="relative w-full max-w-md max-h-full ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-6 flex items-center justify-center border-b rounded-t dark:border-gray-600">
                        <MdCheckCircleOutline className="h-9 w-9" />  도우미 정보를 등록 하시겠습니까?
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="mb-3">
                            <label
                                htmlFor="helperId"
                                className="text-sm text-navy-700 dark:text-white"
                            >도우미ID
                            </label>
                            <input
                                type="text"
                                id="helperId"
                                placeholder="도우미 아이디"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                onChange={handleHelperIdChange}
                            />
                            <label
                                htmlFor="helperName"
                                className="text-sm text-navy-700 dark:text-white"
                            >도우미 이름
                            </label>
                            <input
                                type="text"
                                id="helperName"
                                placeholder="도우미 이름"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                onChange={handleHelperNameChange}
                            />
                            <label
                                htmlFor="helperPhoneNumber"
                                className="text-sm text-navy-700 dark:text-white"
                            >도우미 전화번호
                            </label>
                            <input
                                type="text"
                                id="helperPhoneNumber"
                                placeholder="도우미 전화번호"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                onChange={handleHelperPhoneNumberChange}
                            />
                            <label
                                htmlFor="helperJobType"
                                className="text-sm text-navy-700 dark:text-white"
                            >업무타입
                            </label>
                            <input
                                type="text"
                                id="helperJobType"
                                placeholder="업무타입"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                onChange={handleHelperJobTypeChange}
                            />
                            <label
                                htmlFor="location"
                                className="text-sm text-navy-700 dark:text-white"
                            >근무지
                            </label>
                            <input
                                type="text"
                                id="location"
                                placeholder="근무지"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                onChange={handleLocationChange}
                            />
                            <label
                                htmlFor="expense"
                                className="text-sm text-navy-700 dark:text-white"
                            >희망급여
                            </label>
                            <input
                                type="text"
                                id="expense"
                                placeholder="희망급여"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                onChange={handleExpenseChange}
                            />
                        </div>
                    </div>
                    <div
                        className="text-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="staticModal" type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={helperRegister}>
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

export default HelperModal;