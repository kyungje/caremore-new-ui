import React, {useState} from "react";
import {MdCheckCircleOutline} from "react-icons/md";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    contractStatus : string;
    contractId : number;
}

const NormalModal: React.FC<ModalProps> = ({isOpen, onClose, contractStatus, contractId}) => {
    const [claimContents, setClaimContents] = useState('');
    const [contents, setContents] = useState('');

    const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        switch (contractStatus) {
            case "CLAIMED" : setClaimContents(e.target.value); break;
            case "COMPLETED" : setContents(e.target.value); break;
        }
    };

    const clearClose = () => {
        setContents('');
        setClaimContents('');
        onClose();
    }

    let contractStatusName = "";
    const modalClasses = `${
        isOpen ? 'fixed' : 'hidden'
    } top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center`;

    switch (contractStatus) {
        case "CREATED" : contractStatusName = "생성"; break;
        case "SIGNED" : contractStatusName = "승인"; break;
        case "HOLED" : contractStatusName = "보류"; break;
        case "PAID" : contractStatusName = "결제"; break;
        case "REJECTED" : contractStatusName = "거부"; break;
        case "CLAIMED" : contractStatusName = "클레임"; break;
        case "COMPLETED" : contractStatusName = "완료"; break;
        case "CANCELED" : contractStatusName = "취소"; break;
        default : contractStatusName = ""; break;
    }

    const accept = async () => {
        try{
            const contractData = {
                contractId : contractId,
                contractStatus : contractStatus
            };

            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/contract/v1/contract/accept',{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contractData)
                });
            if(response.ok) alert("승인이 완료되었습니다.");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const reject = async () => {
        try{
            const contractData = {
                contractId : contractId,
                contractStatus : contractStatus
            };

            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/contract/v1/contract/reject',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contractData)
            });
            if(response.ok) alert("계약거부 되었습니다.");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const payment = async () => {
        try{
            const contractData = {
                contractId : contractId,
                contractStatus : contractStatus
            };

            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/contract/v1/contract/pay',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contractData)
            });
            if(response.ok) alert("결제 되었습니다.");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const claim = async () => {
        try{
            const contractData = {
                contractId : contractId,
                contractStatus : contractStatus
            };

            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/contract/v1/contract/claim',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contractData)
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }

        try{
            const claimData = {
                contId : contractId,
                claimContents : claimContents
            };

            console.log("claimData:",claimData);

            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/claim/api/v1/claim',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(claimData)
            });
            if(response.ok) alert("클레임 작성 되었습니다.");

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const complete = async () => {
        try{
            const contractData = {
                contractId : contractId,
                contractStatus : contractStatus
            };

            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/contract/v1/contract/end',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contractData)
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        try{
            const reviewData = {
                contId : contractId,
                contents : contents,
                likeType: "LIKE"
            };

            console.log("reviewData:",reviewData);

            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/review/api/v1/careReviewContents',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });
            if(response.ok) alert("계약종료 되었습니다.");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log("contractId:",contractId);

    const clickOK = () => {
        switch (contractStatus) {
            case "SIGNED" : accept(); break;
            case "PAID" : payment(); break;
            case "REJECTED" : reject(); break;
            case "CLAIMED" : claim(); break;
            case "COMPLETED" : complete(); break;
        }
        clearClose();
    };

    return (
        <div id="defaultModal"  aria-hidden="true"
             className={modalClasses}>
            <div className="relative w-full max-w-md max-h-full ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-6 flex items-center justify-center border-b rounded-t dark:border-gray-600">
                        <MdCheckCircleOutline className="h-9 w-9" />
                        {contractStatus === 'CLAIMED' ? '  클레임을 작성 하시겠습니까?' : null}
                        {contractStatus === 'COMPLETED' ? '  돌봄후기 작성 하시겠습니까?' : null}
                    </div>
                    <div className="p-6 space-y-6">
                        {contractStatus === 'CLAIMED' || contractStatus === 'COMPLETED'  ?
                            <textarea id="comment"
                                      className="w-full px-0 text-sm text-gray-900 bg-white border-d dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                      placeholder="메시지 작성..." required
                                      onChange={handleContentsChange}
                            ></textarea>
                            :
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center justify-center">
                                {contractStatusName} 처리 하시겠습니까?
                            </h3>
                            }
                    </div>
                    <div
                        className="text-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="staticModal" type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={clickOK}>
                            확인
                        </button>
                        <button data-modal-hide="staticModal" type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                onClick={clearClose}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NormalModal;