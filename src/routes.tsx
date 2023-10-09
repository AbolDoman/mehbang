import Employees from './layouts/employees';
import EmployeeDetail from './layouts/employeeDetail';

const routes = [
  {
    name: "Employees",
    key: "employees",
    route: "/employees",
    component: <Employees />,
  },
  {
    name: "Employee Detail",
    key: "employee",
    route: "/employees/:id",
    component: <EmployeeDetail />,
  },
];

export default routes;
