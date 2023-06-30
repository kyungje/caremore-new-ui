import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Card from "../../../components/card";
import ContractItem from "./variables/contractItem";
import NormalModal from "./components/NormalModal";


const Settlements = () => {

    const [contracts, setContracts] = useState<ContractItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusName, setStatusName] = useState('');

    useEffect(()=>{
        fetchContractList();
    },[])

    const fetchContractList = async () => {
        try{
            const response = await fetch('http://localhost:8080/v1/contract/all');
            const data = await response.json();
            setContracts(data);
            console.log("data:",data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openModal = (status:string) => {
        setStatusName(status);
        setIsModalOpen(true);
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
                                    <p className="font-medium">거절</p>
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
                                            onClick={()=>openModal("승인")}
                                        >
                                            승인
                                        </Link>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <Link
                                            to="#"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0.5 px-3 border border-blue-500 hover:border-transparent rounded"
                                            onClick={()=>openModal("거절")}
                                        >
                                            거절
                                        </Link>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <Link
                                            to="#"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0.5 px-3 border border-blue-500 hover:border-transparent rounded"
                                            onClick={()=>openModal("결제")}
                                        >
                                            결제
                                        </Link>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <Link
                                            to="#"
                                            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-0.5 px-3 border border-red-500 hover:border-transparent rounded"
                                            onClick={()=>openModal("클레임")}
                                        >
                                            클레임
                                        </Link>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">

                                        <Link
                                            to="#"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                                            onClick={()=>openModal("계약종료")}
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
            <NormalModal isOpen={isModalOpen} onClose={closeModal} statusName={statusName}/>
        </Card>

    );
};

export default Settlements;
