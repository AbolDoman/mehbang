import { useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Header from '../header'

function DashboardLayout({ children } : {children : React.ReactNode}) {
    return (
      <Box className="bg-[#C7F2FE] w-[100vw] h-[100vh] overflow-auto">
        <Header />
        <Box className="px-4 pt-[50px]">
          {children}
        </Box>
      </Box>
    );
  }
  
  // Typechecking props for the DashboardLayout
  DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export default DashboardLayout;