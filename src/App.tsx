import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import routes from "./routes";
import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MyDrawer from "./components/Drawer";
import { setOpenDrawer, setOpenDrawerReason, useMaterialUIController } from "./context";
export default function App(): JSX.Element {
  const [controller, dispatch] = useMaterialUIController();
  const getRoutes = (allRoutes: any) =>
    allRoutes.map((route: any) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });
  return (
    <>
      <Box
        className="flex justify-center cursor-pointer items-center w-[3rem] h-[3rem] bg-white shadow-sm rounded-full fixed bottom-[2rem] right-[2rem] z-99 text-black"
        style={{ backgroundColor: "#2E87EC" }}
    >
      <AddIcon onClick={() => {
        setOpenDrawer(dispatch, true)
        setOpenDrawerReason(dispatch, "ADD")
      }} className="cursor-pointer text-white"/>
    </Box>
    <MyDrawer />
    <BrowserRouter>
      <div>
          <Routes>
            <Route path="*" element={<Navigate to="/employees" />} />
            {getRoutes(routes)}
          </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}
