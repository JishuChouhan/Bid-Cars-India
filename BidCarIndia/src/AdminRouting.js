import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/addCar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Bids from "./scenes/bid/Bids";
import RemoveCar from "./scenes/allCar/AllCar";

import FrontPage from "./userside/frontpage/FrontPage";
import Login from "./userside/loginpage/Login"; // example user-side component
import UserRequests from "./scenes/userRequests/UserRequests";


function AdminRouting() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="users" element={<Team />} />
                      <Route path="contacts" element={<Contacts />} />
                      <Route path="invoices" element={<Invoices />} />
                      <Route path="form" element={<Form />} />
                      <Route path="bar" element={<Bar />} />
                      <Route path="pie" element={<Pie />} />
                      <Route path="line" element={<Line />} />
                      <Route path="faq" element={<FAQ />} />
                      <Route path="calendar" element={<Calendar />} />
                      <Route path="geography" element={<Geography />} />
                      <Route path="bids" element={<Bids />} />
                      <Route path="removeCar" element={<RemoveCar />} />
                      <Route path="user-requests" element={<UserRequests/>}/>
                    </Routes>
                  </main>
                </>
              }
            />
            
            {/* user side */}
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AdminRouting;