import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Card, CardContent, CardMedia, Button, Collapse, IconButton, Snackbar } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import {BASE_URL} from '../../config/Config'

const styles = {
  carCard: {
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  carImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '200px',
    borderRadius: '8px',
  },
  bidCard: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    position: 'relative',
  },
  winnerBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    color: '#fff',
    borderRadius: '4px',
    padding: '2px 6px',
  },
  sectionTitle: {
    marginBottom: '20px',
    color: '#3b82f6',
  },
  collapsedCard: {
    padding: '10px',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
};

const Bids = () => {
  const [carBidsWithPaper, setCarBidsWithPaper] = useState([]);
  const [carBidsWithoutPaper, setCarBidsWithoutPaper] = useState([]);
  const [expandedCarIds, setExpandedCarIds] = useState({});
  const [expandedWithPaper, setExpandedWithPaper] = useState({});
  const [expandedWithoutPaper, setExpandedWithoutPaper] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const [responseWithPaper, responseWithoutPaper, winnersWithPaper, winnersWithoutPaper] = await Promise.all([
          axios.get(`${BASE_URL}/all/bids`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          axios.get(`${BASE_URL}/all/bids/withoutPaper`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          axios.get(`${BASE_URL}/winnerWithPaper/all`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          axios.get(`${BASE_URL}/winnerWithoutPaper/all`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ]);

        const winnersWithPaperData = winnersWithPaper.data;
        const winnersWithoutPaperData = winnersWithoutPaper.data;

        const updateBidsStatus = (bids, winners) => {
          return bids.map(bid => ({
            ...bid,
            winner: winners.some(winner => winner.bidId === bid.id),
          }));
        };

        const updatedCarBidsWithPaper = responseWithPaper.data.map(car => ({
          ...car,
          bids: updateBidsStatus(car.bids, winnersWithPaperData),
        }));
        const updatedCarBidsWithoutPaper = responseWithoutPaper.data.map(car => ({
          ...car,
          bids: updateBidsStatus(car.bids, winnersWithoutPaperData),
        }));

        setCarBidsWithPaper(updatedCarBidsWithPaper);
        setCarBidsWithoutPaper(updatedCarBidsWithoutPaper);
      } catch (error) {
        console.error("Error fetching bids data:", error);
        setSnackbarMessage('Error fetching bids data.');
        setSnackbarOpen(true);
      }
    };

    fetchBids();
  }, []);

  const toggleExpandCar = (carId) => {
    setExpandedCarIds(prevState => ({
      ...prevState,
      [carId]: !prevState[carId],
    }));
  };

  const toggleExpandWithPaper = (carId) => {
    setExpandedWithPaper(prevState => ({
      ...prevState,
      [carId]: !prevState[carId],
    }));
  };

  const toggleExpandWithoutPaper = (carId) => {
    setExpandedWithoutPaper(prevState => ({
      ...prevState,
      [carId]: !prevState[carId],
    }));
  };

  const handleDeleteBid = async (bidId, carId, withPaper = true) => {
    const endpoint = withPaper ? `car/bid/${bidId}` : `car/bid/withoutPaper/${bidId}`;
    const token = localStorage.getItem('jwtToken');

    try {
      await axios.delete(`${BASE_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (withPaper) {
        const updatedCarBidsWithPaper = carBidsWithPaper.map(car => {
          if (car.carId === carId) {
            const updatedBids = car.bids.filter(bid => bid.id !== bidId);
            return { ...car, bids: updatedBids };
          }
          return car;
        });
        setCarBidsWithPaper(updatedCarBidsWithPaper);
      } else {
        const updatedCarBidsWithoutPaper = carBidsWithoutPaper.map(car => {
          if (car.carId === carId) {
            const updatedBids = car.bids.filter(bid => bid.id !== bidId);
            return { ...car, bids: updatedBids };
          }
          return car;
        });
        setCarBidsWithoutPaper(updatedCarBidsWithoutPaper);
      }
      setSnackbarMessage(`Bid ${bidId} deleted successfully.`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting bid:", error);
      setSnackbarMessage(`Error deleting bid ${bidId}.`);
      setSnackbarOpen(true);
    }
  };

  const handleAnnounceWinner = async (bidId,carId, withPaper = true) => {
    const endpoint = withPaper ? `winner/withPaper/${bidId}/${carId}` : `winner/withoutPaper/${bidId}/${carId}`;
    const token = localStorage.getItem('jwtToken');
    console.log(carId);

    try {
      await axios.post(`${BASE_URL}/${endpoint}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      });
      const updateBidStatus = (bids) => bids.map(bid => bid.id === bidId ? { ...bid, winner: true } : bid);
      
      if (withPaper) {
        const updatedCarBidsWithPaper = carBidsWithPaper.map(car => {
          if (car.bids.some(bid => bid.id === bidId)) {
            return { ...car, bids: updateBidStatus(car.bids) };
          }
          return car;
        });
        setCarBidsWithPaper(updatedCarBidsWithPaper);
      } else {
        const updatedCarBidsWithoutPaper = carBidsWithoutPaper.map(car => {
          if (car.bids.some(bid => bid.id === bidId)) {
            return { ...car, bids: updateBidStatus(car.bids) };
          }
          return car;
        });
        setCarBidsWithoutPaper(updatedCarBidsWithoutPaper);
      }
      setSnackbarMessage(`Winner announced for bid ${bidId}.`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error announcing winner:", error);
      setSnackbarMessage(`Error announcing winner for bid ${bidId}.`);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box m="20px">
      {carBidsWithPaper.map((car) => (
        <Paper key={car.carId} style={expandedCarIds[car.carId] ? styles.carCard : { ...styles.carCard, ...styles.collapsedCard }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {car.carName} (Registration Number: {car.registrationNumber})
              </Typography>
              {car.imageUrl && (
                <CardMedia
                  component="img"
                  style={styles.carImage}
                  image={car.imageUrl}
                  alt={car.carName}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => toggleExpandCar(car.carId)}
                style={{ marginTop: '20px' }}
                endIcon={expandedCarIds[car.carId] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              >
                {expandedCarIds[car.carId] ? 'Hide Bids' : 'Show Bids'}
              </Button>
              <Collapse in={expandedCarIds[car.carId]} timeout="auto" unmountOnExit>
                <Box mt="20px">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => toggleExpandWithPaper(car.carId)}
                    endIcon={expandedWithPaper[car.carId] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    fullWidth
                  >
                    {expandedWithPaper[car.carId] ? 'Hide Bids with Paper' : 'Show Bids with Paper'}
                  </Button>
                  <Collapse in={expandedWithPaper[car.carId]} timeout="auto" unmountOnExit>
                    <Box mt="10px">
                      {car.bids.length > 0 ? (
                        car.bids.map((bid) => (
                          <Paper key={bid.id} style={styles.bidCard}>
                            {bid.winner && (
                              <Box style={styles.winnerBadge}>
                                <CheckCircleIcon style={{ marginRight: '5px' }} />
                                <Typography variant="body2">Winner</Typography>
                              </Box>
                            )}
                            <Typography variant="body1">Bid Amount: ${bid.amount}</Typography>
                            <Typography variant="body2">Bidder: {bid.bidder}</Typography>
                            <Typography variant="body2">Date: {new Date(bid.date).toLocaleString()}</Typography>
                            {!bid.winner && (
                              <Box display="flex" justifyContent="flex-end">
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  style={styles.deleteButton}
                                  onClick={() => handleDeleteBid(bid.id, car.carId, true)}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  style={{ marginLeft: '10px' }}
                                  onClick={() => handleAnnounceWinner(bid.id,car.carId, true)}
                                  disabled={car.bids.some(b => b.winner)}
                                >
                                  Announce Winner
                                </Button>
                              </Box>
                            )}
                          </Paper>
                        ))
                      ) : (
                        <Typography variant="body2">No bids with paper for {car.carName}.</Typography>
                      )}
                    </Box>
                  </Collapse>
                </Box>
                <Box mt="20px">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => toggleExpandWithoutPaper(car.carId)}
                    endIcon={expandedWithoutPaper[car.carId] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    fullWidth
                  >
                    {expandedWithoutPaper[car.carId] ? 'Hide Bids without Paper' : 'Show Bids without Paper'}
                  </Button>
                  <Collapse in={expandedWithoutPaper[car.carId]} timeout="auto" unmountOnExit>
                    <Box mt="10px">
                      {carBidsWithoutPaper.find(c => c.carId === car.carId)?.bids.length > 0 ? (
                        carBidsWithoutPaper.find(c => c.carId === car.carId).bids.map((bid) => (
                          <Paper key={bid.id} style={styles.bidCard}>
                            {bid.winner && (
                              <Box style={styles.winnerBadge}>
                                <CheckCircleIcon style={{ marginRight: '5px' }} />
                                <Typography variant="body2">Winner</Typography>
                              </Box>
                            )}
                            <Typography variant="body1">Bid Amount: ${bid.amount}</Typography>
                            <Typography variant="body2">Bidder: {bid.bidder}</Typography>
                            <Typography variant="body2">Date: {new Date(bid.date).toLocaleString()}</Typography>
                            {!bid.winner && (
                              <Box display="flex" justifyContent="flex-end">
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  style={styles.deleteButton}
                                  onClick={() => handleDeleteBid(bid.id, car.carId, false)}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  style={{ marginLeft: '10px' }}
                                  onClick={() => handleAnnounceWinner(bid.id,car.carId,false)}
                                  disabled={carBidsWithoutPaper.find(c => c.carId === car.carId)?.bids.some(b => b.winner)}
                                >
                                  Announce Winner
                                </Button>
                              </Box>
                            )}
                          </Paper>
                        ))
                      ) : (
                        <Typography variant="body2">No bids without paper for {car.carName}.</Typography>
                      )}
                    </Box>
                  </Collapse>
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        </Paper>
      ))}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Bids;
