import React, { useEffect } from 'react';
import { useMaterialUIController, setAllEmployees, setOpenDrawer, setIsLoading, setOpenDrawerReason, setEditedEmployee } from '../../context';
import EmployeesLayout from '../../components/EmployeesLayout'
import { Button } from '@mui/material';
import { getAllEmployees } from '../../api/apiMehbang';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Employees(): JSX.Element {
  const [controller, dispatch] = useMaterialUIController();
  const { allEmployees, isLoading } = controller

  useEffect(()=>{
    setIsLoading(dispatch, true);
    getAllEmployees((isOk:boolean, data:any) => {
        if(!isOk){
            if (process.env.REACT_APP_MODE === "dev") console.log("Get Employees data From api is unSuccessful!", data);
            if (data.response.status === 429) {
                toast.error("too many request occoured! please refresh again!");
            }
            setIsLoading(dispatch, false);
        }else {
            setAllEmployees(dispatch, data.data.data);
            setIsLoading(dispatch, false);
        }
    })
  }, []);
  return (
    <EmployeesLayout>
      <div className='py-2 px-4'>
        <div className='bg-white flex flex-col justify-center rounded-[30px] min-h-[50vh] p-4'>
            <div className='flex items-center justify-center text-[20px] font-bold pb-2'>Employees List</div>
            <div className='grid  grid-cols-6 gap-4 border-b mb-4'>
                <div className='flex items-center justify-center'>id</div>
                <div className='flex items-center justify-center'>name</div>
                <div className='flex items-center justify-center'>age</div>
                <div className='flex items-center justify-center'>salary</div>
                <div className='flex items-center justify-center'>update</div>
                <div className='flex items-center justify-center'>more</div>
            </div>
            {
                isLoading ? <div className='flex items-center justify-center'>Loading...</div>
                : (allEmployees.length === 0
                  ? <div>
                      <div>no any data...</div>
                      <div>may be 421 too many request occoured please refresh</div>
                  </div>
                  : <div>
                    {allEmployees.map((value:any) => {
                        return(
                            <div className='grid  grid-cols-6 gap-4 mb-2'>
                                <div className='flex items-center justify-center'>{value.id}</div>
                                <div className='flex items-center justify-center'>{value.employee_name}</div>
                                <div className='flex items-center justify-center'>{value.employee_age}</div>
                                <div className='flex items-center justify-center'>{value.employee_salary}</div>
                                <div className='flex items-center justify-center'>
                                    <Button onClick={() => {
                                        setOpenDrawer(dispatch, true);
                                        setOpenDrawerReason(dispatch, "EDIT");
                                        setEditedEmployee(dispatch, value);
                                    }}>
                                        <EditIcon className='cursor-pointer text-blue-500' />
                                    </Button>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <Link to={`/employees/${value.id}`}>
                                        <Button>
                                            <MoreHorizIcon className='cursor-pointer' />
                                        </Button>
                                    </Link>
                                </div>
                            </div> 
                        )
                    })}
                  </div> )
            }
        </div>
      </div>
    </EmployeesLayout>
  );
}
