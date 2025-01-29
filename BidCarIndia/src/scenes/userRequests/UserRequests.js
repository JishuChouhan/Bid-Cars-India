import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress, Snackbar, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { BASE_URL } from '../../config/Config';

const fetchUserRequests = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await axios.get(`${BASE_URL}/requested/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = response.data;

    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      location: user.location,
    }));
  } catch (error) {
    console.error('Error fetching user requests:', error);
    return [];
  }
};

const UserRequests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const userRequests = await fetchUserRequests();
      setRows(userRequests);
      setLoading(false);
      if (userRequests.length > 0) {
        setOpenSnackbar(true);
      }
    };
    getData();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.post(`${BASE_URL}/approve/user/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedUserRequests = await fetchUserRequests();
      setRows(updatedUserRequests);
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1, cellClassName: 'name-column--cell' },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleApprove(params.row.id)}
        >
          Approve
        </Button>
      ),
    },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box m="20px">
      <Header title="User Requests" subtitle="Approve or reject user requests" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="New user requests available"
      />
    </Box>
  );
};

export default UserRequests;
