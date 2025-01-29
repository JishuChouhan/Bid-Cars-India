import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from 'react';
import {BASE_URL} from '../../config/Config'

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage
    const response = await axios.get(`${BASE_URL}/allusers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = response.data;

    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phoneNumber,
      location: user.location, // Assuming this field exists in your API response
      registrationDate: user.registrationDate, // Assuming this field exists in your API response
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const users = await fetchUsers();
      setRows(users);
    };
    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "registrationDate",
      headerName: "Date",
      type: "date",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1, // Adjust flex value as needed
    }
  ];

  return (
    <Box m="20px">
      <Header title="All Users" subtitle="Managing the Users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
