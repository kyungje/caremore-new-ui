import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Card from "../../../components/card";
import HelperItem from "./variables/helperItem";
import NormalModal from "./components/NormalModal";
import HelperModal from "./components/HelperModal";


const Contracts = () => {
    const [helpers, setHelpers] = useState<HelperItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [helperId, setHelperId] = useState(0);
    const [isHelperModalOpen, setIsHelperModalOpen] = useState(false);

    useEffect(()=>{
        fetchHelperList();
    },[])

    const fetchHelperList = async () => {
        try{
            const response = await fetch('http://a4012beb6509f4d2e8bd8fb783d8229b-1946401046.ap-northeast-2.elb.amazonaws.com:8080/helper/HelperOffers');
            const data = await response.json();
            setHelpers(data);
            console.log("data:",data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openModal = (helperId:number) => {
        setIsModalOpen(true);
        setHelperId(helperId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openHelperModal = () => {
        setIsHelperModalOpen(true);
    };

    const closeHelperModal = () => {
        setIsHelperModalOpen(false);
    };

    return (
        <Card extra={"w-full pb-10 p-4 h-full"}>
            <header className="relative flex items-center justify-between">
                <div className="text-xl font-bold text-navy-700 dark:text-white ">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchHelperList}>
                        조회
                    </button>
                    <button className="ml-3 bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>openHelperModal()}>
                        도우미등록
                    </button>
                </div>
            </header>

            <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                <table className="w-full">
                    <thead>
                    <tr className="bg-lightPrimary">
                        <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                            <div className="items-center justify-between text-sm text-base">
                                <p className="font-medium">도우미번호</p>
                            </div>
                        </th>
                        <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                            <div className="items-center justify-between text-sm text-base">
                                <p className="font-medium">도우미</p>
                            </div>
                        </th>
                        <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                            <div className="items-center justify-between text-sm text-base">
                                <p className="font-medium">연락처</p>
                            </div>
                        </th>
                        <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                            <div className="items-center justify-between text-sm text-base">
                                <p className="font-medium">업무타입</p>
                            </div>
                        </th>
                        <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                            <div className="items-center justify-between text-sm text-base">
                                <p className="font-medium">근무가능지역</p>
                            </div>
                        </th>
                        <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                            <div className="items-center justify-between text-sm text-base">
                                <p className="font-medium">희망급여</p>
                            </div>
                        </th>
                        <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                            <div className="items-center justify-between text-sm text-base">
                                <p className="font-medium">상태</p>
                            </div>
                        </th>
                        <th className="border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-center">
                            <div className="items-center justify-between text-sm text-base">
                                <p className="font-medium">계약요청</p>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {helpers.map((helper,index)=>{
                        return (
                            <tr className="border-b dark:border-neutral-500" key={index}>
                                <td className="min-w-[80px] border-white/0 py-3  pr-4 text-center">
                                    <p className="text-sm text-gray-700 dark:text-white">{helper.id}</p>
                                </td>
                                <td className="min-w-[100px] border-white/0 py-3  pr-4 text-center">
                                    <p className="text-sm text-black dark:text-white">{helper.helperName}</p>
                                </td>
                                <td className="min-w-[100px] border-white/0 py-3  pr-4 text-center">
                                    <p className="text-sm text-black dark:text-white">{helper.helperPhoneNumber}</p>
                                </td>
                                <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                    <p className="text-sm text-black dark:text-white">{helper.helperJobType}</p>
                                </td>
                                <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                    <p className="text-sm text-black dark:text-white">{helper.location}</p>
                                </td>
                                <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                    <p className="text-sm text-black dark:text-white">{helper.expense}</p>
                                </td>
                                <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                    <p className="text-sm text-black dark:text-white">{helper.status}</p>
                                </td>
                                <td className="min-w-[150px] border-white/0 py-3  pr-4 text-center">
                                    <Link
                                        to="#"
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                                        onClick={()=>openModal(helper.id)}
                                    >
                                        계약요청
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <NormalModal isOpen={isModalOpen} onClose={closeModal} helperId = {helperId}/>
            <HelperModal isOpen={isHelperModalOpen} onClose={closeHelperModal} />
        </Card>
    );
};

export default Contracts;
