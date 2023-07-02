import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Card from "../../../components/card";
import ContractItem from "./variables/contractItem";
import NormalModal from "./components/NormalModal";


const Contracts = () => {

    const [contracts, setContracts] = useState<ContractItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contractStatus, setContractStatus] = useState('');
    const [contractId, setContractId] = useState(0);

    useEffect(()=>{
        fetchContractList();
    },[])

    const fetchContractList = async () => {
        try{
            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/contract/v1/contract/all');
            const data = await response.json();
            setContracts(data);
            console.log("data:",data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openModal = (contractStatus:string, contractId:number) => {
        setContractStatus(contractStatus);
        setIsModalOpen(true);
        setContractId(contractId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Card extra={"w-full pb-10 p-4 h-full"}>
            <header className="relative flex items-center justify-between">
                <div className="text-xl font-bold text-navy-700 dark:text-white ">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchContractList}>
                        조회
                    </button>
                </div>
            </header>

            <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-lightPrimary">
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">계약번호</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">도우미</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">요청자</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">업무타입</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">계약상태</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">승인</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">거부</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">결제</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">클레임</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">계약종료</p>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map((contract,index)=>{
                            return (
                                <tr className="border-b dark:border-neutral-500" key={index}>
                                    <td className="min-w-[80px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-gray-700 dark:text-white">{contract.contractId}</p>
                                    </td>
                                    <td className="min-w-[100px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-black dark:text-white">{contract.helperName}</p>
                                    </td>
                                    <td className="min-w-[100px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-black dark:text-white">{contract.memberName}</p>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-black dark:text-white">{contract.helperJobType}</p>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-black dark:text-white">{contract.contractStatus}</p>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <Link
                                            to="#"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0.5 px-3 border border-blue-500 hover:border-transparent rounded"
                                            onClick={()=>openModal("SIGNED", contract.contractId)}
                                        >
                                            승인
                                        </Link>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <Link
                                            to="#"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0.5 px-3 border border-blue-500 hover:border-transparent rounded"
                                            onClick={()=>openModal("REJECTED", contract.contractId)}
                                        >
                                            거부
                                        </Link>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <Link
                                            to="#"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0.5 px-3 border border-blue-500 hover:border-transparent rounded"
                                            onClick={()=>openModal("PAID", contract.contractId)}
                                        >
                                            결제
                                        </Link>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <Link
                                            to="#"
                                            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-0.5 px-3 border border-red-500 hover:border-transparent rounded"
                                            onClick={()=>openModal("CLAIMED", contract.contractId)}
                                        >
                                            클레임
                                        </Link>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <Link
                                            to="#"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                                            onClick={()=>openModal("COMPLETED", contract.contractId)}
                                        >
                                            계약종료
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <NormalModal isOpen={isModalOpen} onClose={closeModal} contractStatus={contractStatus} contractId = {contractId}/>
        </Card>
    );
};

export default Contracts;
