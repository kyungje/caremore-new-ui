import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Card from "../../../components/card";
import SettlementItem from "./variables/SettlementItem";
import NormalModal from "./components/NormalModal";


const Settlements = () => {

    const [settlements, setSettlements] = useState<SettlementItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [settlementState, setSettlementState] = useState('');
    const [settlementId, setSettlementId] = useState(0);

    useEffect(()=>{
        fetchSettlementList();
    },[]);

    const fetchSettlementList = async () => {
        try{
            const url = 'http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/settlement/settlements';

            const response = await fetch(url);
            const data = await response.json();
            setSettlements(data);
            console.log("data:",data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openModal = (settlementState: string, id: number) => {
        setSettlementState(settlementState);
        setIsModalOpen(true);
        setSettlementId(id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Card extra={"w-full pb-10 p-4 h-full"}>
            <header className="relative flex items-center justify-between">
                <div className="text-xl font-bold text-navy-700 dark:text-white ">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchSettlementList}>
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
                                    <p className="font-medium">정산번호</p>
                                </div>
                            </th>
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
                                    <p className="font-medium">정산금액</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">정산상태</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">승인시각</p>
                                </div>
                            </th>
                            <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                                <div className="items-center justify-between text-sm text-base">
                                    <p className="font-medium">승인</p>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {settlements.map((settlement,index)=>{
                            return (
                                <tr className="border-b dark:border-neutral-500" key={index}>
                                    <td className="min-w-[80px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-gray-700 dark:text-white">{settlement.id}</p>
                                    </td>
                                    <td className="min-w-[100px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-black dark:text-white">{settlement.contractId}</p>
                                    </td>
                                    <td className="min-w-[100px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-black dark:text-white">{settlement.contractHelperName}</p>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-black dark:text-white">{settlement.settledAmount}</p>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-black dark:text-white">{settlement.settlementState}</p>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <p className="text-sm text-black dark:text-white">{settlement.approvedDateTime}</p>
                                    </td>
                                    <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                        <Link
                                            to="#"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0.5 px-3 border border-blue-500 hover:border-transparent rounded"
                                            onClick={()=>openModal(settlement.settlementState, settlement.id)}
                                        >
                                            승인
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <NormalModal isOpen={isModalOpen} onClose={closeModal} settlementState={settlementState} settlementId={settlementId}/>
        </Card>

    );
};

export default Settlements;
