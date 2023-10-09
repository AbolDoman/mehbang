import React, {useEffect, useState} from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { useMaterialUIController, setOpenDrawer, setIsLoading, setAllEmployees } from '../../context';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { getAllEmployees, postAnEmplooyee, putAnEmployee } from '../../api/apiMehbang';

export default function MyDrawer() {
  const [controller, dispatch] = useMaterialUIController();
  const { openDrawer, openDrawerReason, editedEmployee } = controller;
  const [nameVal, setNameVal] = useState("");
  const [ageVal, setAgeVal] = useState("");
  const [salaryVal, setSalaryVal] = useState("");
  useEffect(()=>{
    if(openDrawerReason === "ADD"){
        setNameVal("");
        setAgeVal("");
        setSalaryVal("");
    } else{
        setNameVal(editedEmployee.employee_name);
        setAgeVal(editedEmployee.employee_age);
        setSalaryVal(editedEmployee.employee_salary);
    }
  }, [openDrawerReason]);

  const addEmployee = () => {
    if (nameVal === "" || ageVal === "" || salaryVal === ""){
        toast.warn("please fill out all of the inputs")
        return;
    }
    const body = {
        name: nameVal,
        age: JSON.stringify(ageVal),
        salary: salaryVal,
    }
    postAnEmplooyee((isOk:boolean, data:any) => {
        if(!isOk){
            if (process.env.REACT_APP_MODE === "dev") console.log("Error in post new employee!", data);
            if (data.response.status === 429) {
                toast.error("Error in post new employee!");
            }
        } else {
            toast.success("post new employee is successful!");
            setNameVal("");
            setAgeVal("");
            setSalaryVal("");
            setIsLoading(dispatch, true);
            setOpenDrawer(dispatch, false);
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
        }
    }, body)

  }
  const updateEmployee = () => {
    if (nameVal === "" || ageVal === "" || salaryVal === ""){
        toast.warn("please fill out all of the inputs")
        return;
    }
    if (nameVal === editedEmployee.employee_name && 
        ageVal === editedEmployee.employee_age && 
        salaryVal === editedEmployee.employee_salary){
        toast.warn("this values equal to previous values!")
        return;
    }
    const body = {
        name: nameVal,
        age: JSON.stringify(ageVal),
        salary: salaryVal,
    }
    putAnEmployee((isOk:boolean, data:any) => {
        if(!isOk){
            if (process.env.REACT_APP_MODE === "dev") console.log("Error in update an employee!", data);
            if (data.response.status === 429) {
                toast.error("Error in update an employee!");
            }
            setOpenDrawer(dispatch, false)
        } else {
            toast.success("update an employee is successful!");
            setNameVal("");
            setAgeVal("");
            setSalaryVal("");
            setIsLoading(dispatch, true);
            setOpenDrawer(dispatch, false)
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
        }
    }, editedEmployee.id, body)

  }
  return (
    <div>
    <Drawer
        anchor={"right"}
        open={openDrawer}
        onClose={() => setOpenDrawer(dispatch, false)}
    >
    <div className='min-w-[300px] p-2'>
        <div className='flex justify-end'>
            <CloseIcon className='cursor-pointer' onClick={()=>setOpenDrawer(dispatch, false)} />
        </div>
        <div className='py-4'>
            {openDrawerReason === "ADD"
            ?"Add a new Eployee box"
            :"Edit an Eployee box"}
        </div>
        <div className='py-4'>
        <div className='py-1'>Name:</div>
        <div className='flex items-center justify-center'>
            <TextField value={nameVal} onChange={(e)=>setNameVal(e.target.value)} 
                id="nameInput" label="Name" variant="filled" />
        </div>
        </div>
        <div className='py-4'>
        <div className='py-1'>Age:</div>
        <div className='flex items-center justify-center'>
            <TextField type='number' value={ageVal} onChange={(e)=>setAgeVal(e.target.value)} 
                id="ageInput" label="Age" variant="filled" />
        </div>
        </div>
        <div className='py-1'>Salary:</div>
        <div className='flex items-center justify-center'>
            <TextField value={salaryVal} onChange={(e)=>setSalaryVal(e.target.value)} 
                id="salaryInput" label="Salary" variant="filled" />
        </div>
        </div>
        <div className='py-4 flex items-center justify-center'>
            {openDrawerReason === "ADD"
            ? <Button variant="contained" className='w-[100px]' onClick={() => addEmployee()}>ADD</Button>
            : <Button variant="contained" className='w-[100px]' onClick={() => updateEmployee()}>UPDATE</Button>}
        </div>
    </Drawer>
    </div>
  );
}