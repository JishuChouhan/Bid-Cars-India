import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { BASE_URL } from '../../config/Config';
import { useState } from "react";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);  // Show loader
    setErrorMessage("");  // Clear previous errors

    const formattedAuctionEndTime = format(values.auctionEndTime, "yyyy-MM-dd'T'HH:mm:ss");

    const carData = {
        carName: values.vehicleName,
        registrationNumber: values.registrationPage,
        ownerNumber: parseInt(values.ownershipNumber),
        modelNumber: parseInt(values.modelNumber),
        fuelType: values.fuelType,
        transmissionType: values.transmissionType,
        location: values.location,
        vehicleDetail: values.vehicleDetails,
        visible: false,
        auctionEndTime: formattedAuctionEndTime,
    };

    const token = localStorage.getItem('jwtToken');

    try {
        // First API call to add the car
        const carResponse = await axios.post(`${BASE_URL}/car`, carData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const carId = carResponse.data.id;

        // Prepare FormData for images
        const formData = new FormData();
        values.photoFiles.forEach((file) => {
            formData.append("files", file);
        });
        formData.append("id", carId);

        // Second API call to submit images
        await axios.post(`${BASE_URL}/add/car/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });

        resetForm();
        setSnackbarMessage("Car successfully registered!");
        setOpenSnackbar(true);
    } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.data) {
            setErrorMessage(error.response.data); // Display specific error message
        } else {
            setErrorMessage("An unexpected error occurred. Please try again."); // Generic error message
        }
    } finally {
        setSubmitting(false);
        setLoading(false);  // Hide loader
    }
};

const checkoutSchema = yup.object().shape({
    vehicleName: yup.string().required("Vehicle Name is required"),
    modelNumber: yup.number().required("Model Number is required"),
    fuelType: yup.string().required("Fuel Type is required"),
    transmissionType: yup.string().required("Transmission Type is required"),
    ownershipNumber: yup.number().required("Ownership Number is required"),
    location: yup.string().required("Location is required"),
    registrationPage: yup.string().required("Registration number is required"),
    vehicleDetails: yup.string().required("Vehicle Details is required"),
    photoFiles: yup
      .array()
      .of(yup.mixed().required("A file is required"))
      .required("Photo Files are required"),
    auctionEndTime: yup.date().required("Auction End Time is required"),
});

const initialValues = {
    vehicleName: "",
    modelNumber: "",
    fuelType: "",
    transmissionType: "",
    ownershipNumber: "",
    location: "",
    registrationPage: "",
    vehicleDetails: "",
    photoFiles: [],
    auctionEndTime: null,
};

const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
};

return (
    <Box m="20px">
        <Header title="ADD NEW CAR" subtitle="Add New Car For Auction" />
        <Formik
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            onSubmit={handleFormSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                setFieldValue,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Vehicle Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.vehicleName}
                            name="vehicleName"
                            error={!!touched.vehicleName && !!errors.vehicleName}
                            helperText={touched.vehicleName && errors.vehicleName}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Model Number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.modelNumber}
                            name="modelNumber"
                            error={!!touched.modelNumber && !!errors.modelNumber}
                            helperText={touched.modelNumber && errors.modelNumber}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                            <InputLabel>Fuel Type</InputLabel>
                            <Select
                                name="fuelType"
                                value={values.fuelType}
                                onChange={handleChange}
                                error={!!touched.fuelType && !!errors.fuelType}
                            >
                                <MenuItem value="Petrol">Petrol</MenuItem>
                                <MenuItem value="Diesel">Diesel</MenuItem>
                                <MenuItem value="CNG">CNG</MenuItem>
                            </Select>
                            {touched.fuelType && errors.fuelType && (
                                <Box mt={1} color="error.main">
                                    {errors.fuelType}
                                </Box>
                            )}
                        </FormControl>
                        <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                            <InputLabel>Transmission Type</InputLabel>
                            <Select
                                name="transmissionType"
                                value={values.transmissionType}
                                onChange={handleChange}
                                error={!!touched.transmissionType && !!errors.transmissionType}
                            >
                                <MenuItem value="Manual">Manual</MenuItem>
                                <MenuItem value="Automatic">Automatic</MenuItem>
                            </Select>
                            {touched.transmissionType && errors.transmissionType && (
                                <Box mt={1} color="error.main">
                                    {errors.transmissionType}
                                </Box>
                            )}
                        </FormControl>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Ownership No."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ownershipNumber}
                            name="ownershipNumber"
                            error={!!touched.ownershipNumber && !!errors.ownershipNumber}
                            helperText={touched.ownershipNumber && errors.ownershipNumber}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            name="location"
                            error={!!touched.location && !!errors.location}
                            helperText={touched.location && errors.location}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Registration Number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.registrationPage}
                            name="registrationPage"
                            error={!!touched.registrationPage && !!errors.registrationPage}
                            helperText={touched.registrationPage && errors.registrationPage}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Vehicle Details"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.vehicleDetails}
                            name="vehicleDetails"
                            error={!!touched.vehicleDetails && !!errors.vehicleDetails}
                            helperText={touched.vehicleDetails && errors.vehicleDetails}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <Box sx={{ gridColumn: "span 4" }}>
                            <ReactDatePicker
                                selected={values.auctionEndTime}
                                onChange={(date) => setFieldValue("auctionEndTime", date)}
                                showTimeSelect
                                dateFormat="Pp"
                                customInput={
                                    <TextField
                                        label="Auction End Time"
                                        variant="filled"
                                        fullWidth
                                        sx={{ width: "100%" }} // Adjust width as needed
                                    />
                                }
                                name="auctionEndTime"
                            />
                            {touched.auctionEndTime && errors.auctionEndTime && (
                                <Box mt={1} color="error.main">
                                    {errors.auctionEndTime}
                                </Box>
                            )}
                        </Box>
                        <Box sx={{ gridColumn: "span 4" }}>
                            <input
                                id="photoFiles"
                                name="photoFiles"
                                type="file"
                                multiple
                                onChange={(event) => {
                                    setFieldValue("photoFiles", Array.from(event.currentTarget.files));
                                }}
                            />
                            {touched.photoFiles && errors.photoFiles && (
                                <Box mt={1} color="error.main">
                                    {errors.photoFiles}
                                </Box>
                            )}
                        </Box>
                    </Box>
                    {loading && (
                        <Box display="flex" justifyContent="center" mt="20px" sx={{ position: 'relative', height: '100px' }}>
                            <CircularProgress />
                            <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                            >
                                <CircularProgress />
                            </Box>
                        </Box>
                    )}
                    {errorMessage && (
                        <Box display="flex" justifyContent="center" mt="20px" color="error.main">
                            {errorMessage}
                        </Box>
                    )}
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting || loading}>
                            Add New Car
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    </Box>
);
};

export default Form;
