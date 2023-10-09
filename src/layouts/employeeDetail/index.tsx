import React, { useEffect, useState } from 'react';
import { useMaterialUIController, setIsLoading } from '../../context';
import EmployeesLayout from '../../components/EmployeesLayout';
import { getAnEmployeeDetail } from '../../api/apiMehbang';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';


export default function EmployeeDetail(): JSX.Element {
  interface employeeInterface {
    employee_age: number;
    employee_name: string;
    employee_salary: number;
    employee_image: string;
    id: number;
  }
  const [controller, dispatch] = useMaterialUIController();
  const { isLoading } = controller;
  const [employeeDetail, setEmployeeDetail] = useState<any>()
  const [isGiveData, setIsGiveData] = useState<boolean>(false)
  const { pathname } = useLocation();
  let id:any = pathname.split("/");
  id = id[id.length - 1]
  id = parseInt(id);
  useEffect(() => {
    setIsLoading(dispatch, true);
    getAnEmployeeDetail((isOk:boolean, data:any) => {
        if(!isOk){
            setIsGiveData(false);
            if (process.env.REACT_APP_MODE === "dev") console.log("Get an Employee detail data From api is unSuccessful!", data);
            if (data.response.status === 429) {
                toast.error("too many request occoured! please refresh again!");
            }else{
              toast.error(data?.response?.data?.message);
            }
            setIsLoading(dispatch, false);
        }else {
            setEmployeeDetail(data.data.data);
            setIsLoading(dispatch, false);
            setIsGiveData(true);
        }
    }, id)
  }, []);
  return (
    <EmployeesLayout>
      <div className='py-2 px-4'>
        <div className='bg-white flex flex-col justify-center rounded-[30px] min-h-[50vh] p-4'>
          <Link to={`/employees`}>
            <div className='mr-auto cursor-pointer'><u>Back to Dashboard</u></div>
          </Link>
            <div className='flex items-center justify-center text-[20px] font-bold pb-2'>
              Employee Detail table
            </div>
            {
                isLoading ? <div className='flex items-center justify-center'>Loading...</div>
                : (!isGiveData
                  ? <div>
                      <div>no any data...</div>
                      <div>may be 421 too many request occoured please refresh</div>
                  </div>
                  : <div className='grid  grid-cols-4 gap-4 border-b mb-4'>
                  <div className='flex items-center justify-center'>{employeeDetail.id}</div>
                  <div className='flex items-center justify-center'>{employeeDetail.employee_name}</div>
                  <div className='flex items-center justify-center'>{employeeDetail.employee_age}</div>
                  <div className='flex items-center justify-center'>{employeeDetail.employee_salary}</div>
              </div>)
            }
        </div>
      </div>
    </EmployeesLayout>
  );
}
