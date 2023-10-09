import { Box } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  return (
    <Box className="bg-white fixed w-[100%] h-[50px] px-8 z-50 flex items-center">
        <a href="/employees">
            <div className="flex items-center">
                    <img src="/images/logo.jpg" alt="main logo" className="rounded-md h-[40px] w-[40px]" />
                    <h1 className="ml-[10px] font-bold">
                        Mahbang Test
                    </h1>
            </div>
        </a>
        <div className="flex items-center justify-center grow">
            <a href="/employees"><u>employees</u></a>
            <div className="ml-[10px]">menu...</div>
        </div>
        <div className="flex ml-auto">
            <LogoutIcon />
            <div>
                Logout
            </div>
        </div>
    </Box>
  );
}