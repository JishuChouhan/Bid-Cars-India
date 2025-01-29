import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Card, CardContent, Box, CircularProgress, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { EmojiEvents, HourglassEmpty, ExpandMore } from '@mui/icons-material';
import axios from 'axios';
import {BASE_URL} from '../../config/Config'

const styles = {
  paper: {
    padding: 20,
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    border: '1px solid #ddd',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    marginBottom: 20,
    color: '#3b82f6',
  },
  icon: {
    marginRight: 8,
  },
  winningBid: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 8,
  },
  otherBids: {
    backgroundColor: '#f1f8e9',
    padding: 20,
    borderRadius: 8,
  },
  bidCard: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

const YourBid = () => {
  const [winningWithPaper, setWinningWithPaper] = useState(null);
  const [winningWithoutPaper, setWinningWithoutPaper] = useState(null);
  const [otherBidsWithPaper, setOtherBidsWithPaper] = useState([]);
  const [otherBidsWithoutPaper, setOtherBidsWithoutPaper] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT from local storage
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch winning bid with paper
        const { data: winningWithPaperData } = await axios.get(`${BASE_URL}/winning/bids/withPaper`, { headers });
        setWinningWithPaper(winningWithPaperData[0] || null);

        // Fetch winning bid without paper
        const { data: winningWithoutPaperData } = await axios.get(`${BASE_URL}/winning/bids/withoutPaper`, { headers });
        setWinningWithoutPaper(winningWithoutPaperData[0] || null);

        // Fetch other bids with paper
        const { data: otherBidsWithPaperData } = await axios.get(`${BASE_URL}/all/waiting/bidWithPaper`, { headers });
        setOtherBidsWithPaper(otherBidsWithPaperData);

        // Fetch other bids without paper
        const { data: otherBidsWithoutPaperData } = await axios.get(`${BASE_URL}/all/waiting/bidWithoutPaper`, { headers });
        setOtherBidsWithoutPaper(otherBidsWithoutPaperData);

        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  if (loading) {
    return (
      <Paper elevation={3} style={styles.paper}>
        <div style={styles.loading}>
          <CircularProgress />
        </div>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} style={styles.paper}>
        <Typography style={styles.error}>{error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} style={styles.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" style={styles.sectionTitle}>
            Your Bids
          </Typography>
        </Grid>

        {/* Winning Bid with Paper Section */}
        <Grid item xs={12}>
          <Box style={styles.winningBid}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h5" style={styles.sectionTitle}>
                  <EmojiEvents style={styles.icon} /> Winning Bid with Paper
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {winningWithPaper ? (
                  <Card style={styles.bidCard}>
                    <CardContent>
                      <Typography variant="h6">{winningWithPaper.carName}</Typography>
                      <Typography variant="body1">Registration Number: {winningWithPaper.registrationNumber}</Typography>
                      <Typography variant="body1">Amount: ${winningWithPaper.amount}</Typography>
                      <Typography variant="body2">Bid Date: {new Date(winningWithPaper.date).toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <Typography variant="body1">No winning bid with paper</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>

        {/* Winning Bid without Paper Section */}
        <Grid item xs={12}>
          <Box style={styles.winningBid}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h5" style={styles.sectionTitle}>
                  <EmojiEvents style={styles.icon} /> Winning Bid without Paper
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {winningWithoutPaper ? (
                  <Card style={styles.bidCard}>
                    <CardContent>
                      <Typography variant="h6">{winningWithoutPaper.carName}</Typography>
                      <Typography variant="body1">Registration Number: {winningWithoutPaper.registrationNumber}</Typography>
                      <Typography variant="body1">Amount: ${winningWithoutPaper.amount}</Typography>
                      <Typography variant="body2">Bid Date: {new Date(winningWithoutPaper.date).toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <Typography variant="body1">No winning bid without paper</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>

        {/* Other Bids with Paper Section */}
        <Grid item xs={12}>
          <Box style={styles.otherBids}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h5" style={styles.sectionTitle}>
                  <HourglassEmpty style={styles.icon} /> Other Bids with Paper
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {otherBidsWithPaper.length > 0 ? (
                  otherBidsWithPaper.map((bid, index) => (
                    <Card key={index} style={styles.bidCard}>
                      <CardContent>
                        <Typography variant="h6">{bid.carName}</Typography>
                        <Typography variant="body1">Registration Number: {bid.registrationNumber}</Typography>
                        <Typography variant="body1">Amount: ${bid.amount}</Typography>
                        <Typography variant="body2">Bid Date: {new Date(bid.date).toLocaleString()}</Typography>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body1">No other bids with paper available</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>

        {/* Other Bids without Paper Section */}
        <Grid item xs={12}>
          <Box style={styles.otherBids}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h5" style={styles.sectionTitle}>
                  <HourglassEmpty style={styles.icon} /> Other Bids without Paper
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {otherBidsWithoutPaper.length > 0 ? (
                  otherBidsWithoutPaper.map((bid, index) => (
                    <Card key={index} style={styles.bidCard}>
                      <CardContent>
                        <Typography variant="h6">{bid.carName}</Typography>
                        <Typography variant="body1">Registration Number: {bid.registrationNumber}</Typography>
                        <Typography variant="body1">Amount: ${bid.amount}</Typography>
                        <Typography variant="body2">Bid Date: {new Date(bid.date).toLocaleString()}</Typography>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body1">No other bids without paper available</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default YourBid;
