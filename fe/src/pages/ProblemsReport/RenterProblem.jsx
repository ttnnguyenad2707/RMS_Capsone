import React, { useEffect, useLayoutEffect, useState } from 'react';
import SelectHouse from '../../CommonComponents/SelectHouse';
import TableData from '../../CommonComponents/TableData';
import { deleteProblem, getProblemsInHouse } from '../../services/problems';
import {toast} from 'react-toastify'
import ModalAddProblem from './Component/ModalAddProblem';

const RenterProblem = () => {
    const [problems,setProblems] = useState([]);
    const [selectedHouseId, setSelectedHouseId] = useState();
    const [dataTable,setDataTable] = useState([]);
    useEffect(() => {
        if(selectedHouseId) {
            setDataTable([])
            getProblemsInHouse(selectedHouseId).then(data => {
                data.data.data.data.map(data => {
                    setDataTable(prev => [...prev,{
                        id: data._id,
                        Title : data.title,
                        Content: data.content,
                        Status: data.status,
                        Room: data.roomId.name,
                        Creator: data.creatorId.name,
                    }])
                })    
            })
        }
    },[selectedHouseId])
    const handleDelete = (id) => {
        deleteProblem(id).then(data=> {
            toast.success("Delete successfully");
            setDataTable(prevDataTable => prevDataTable.filter(problem => problem.id !== id));
        })
    }
    return (
        <div>
            <ModalAddProblem/>
            <SelectHouse onSelect={setSelectedHouseId}/>
            <TableData data={dataTable} deleteData={handleDelete}/>
        </div>
    );
};

export default RenterProblem;
