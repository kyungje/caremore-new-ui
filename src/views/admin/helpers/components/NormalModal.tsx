import React, {useState} from "react";
import {MdCheckCircleOutline} from "react-icons/md";
import {useNavigate} from "react-router-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    helperId : number;
}

const NormalModal: React.FC<ModalProps> = ({isOpen, onClose, helperId}) => {
    const modalClasses = `${
        isOpen ? 'fixed' : 'hidden'
    } top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center`;

    const [memberId, setMemberId] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberPhoneNumber, setMemberPhoneNumber] = useState('');
    const [targetName, setTargetName] = useState('');
    const navigate = useNavigate();

    const handleMemberIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMemberId(e.target.value);
    };
    const handleMemberNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMemberName(e.target.value);
    };
    const handleMemberPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMemberPhoneNumber(e.target.value);
    };
    const handleTargetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTargetName(e.target.value);
    };

    const contractAccepted = async () => {
        try{
            const acceptData = {
                id : helperId,
                memberId : memberId,
                memberName : memberName,
                memberPhoneNumber : memberPhoneNumber,
                targetName : targetName,
                status : "계약요청"
            };

            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/helper/HelperOffers',{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(acceptData)
            });
            if(response.ok) navigate("/admin/contracts");
            else alert("계약요청 중 오류가 발생했습니다.");
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
                        <MdCheckCircleOutline className="h-9 w-9" />  계약 요청 하시겠습니까?
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="mb-3">
                            <label
                                htmlFor="memberId"
                                className="text-sm text-navy-700 dark:text-white"
                            >회원ID
                            </label>
                            <input
                                type="text"
                                id="memberId"
                                placeholder="회원 아이디"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                onChange={handleMemberIdChange}
                            />
                            <label
                                htmlFor="memberName"
                                className="text-sm text-navy-700 dark:text-white"
                            >회원 이름
                            </label>
                            <input
                                type="text"
                                id="memberName"
                                placeholder="회원 이름"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                onChange={handleMemberNameChange}
                            />
                            <label
                                htmlFor="memberPhoneNumber"
                                className="text-sm text-navy-700 dark:text-white"
                            >회원 전화번호
                            </label>
                            <input
                                type="text"
                                id="memberPhoneNumber"
                                placeholder="회원 전화번호"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                onChange={handleMemberPhoneNumberChange}
                            />
                            <label
                                htmlFor="targetName"
                                className="text-sm text-navy-700 dark:text-white"
                            >돌봄 대상
                            </label>
                            <input
                                type="text"
                                id="targetName"
                                placeholder="돌봄 대상"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                                onChange={handleTargetNameChange}
                            />
                        </div>
                    </div>
                    <div
                        className="text-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="staticModal" type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={contractAccepted}>
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