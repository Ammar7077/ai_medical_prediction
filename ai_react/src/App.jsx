import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Particles from "react-tsparticles";
import axios from "axios";
import { green, red } from "@mui/material/colors";

function App() {
  const [formData, setFormData] = useState({
    heart_rate: "",
    systolic_blood_pressure: "",
    diastolic_blood_pressure: "",
    oxygen_saturation: "",
    resp_rate: "",
    temperature: "",
  });

  const [apiResponse, setApiResponse] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request using Axios
      const response = await axios.post(
        "http://localhost:8000/predict/",
        formData
      );
      // Store the API response
      setApiResponse(response.data);
    } catch (error) {
      console.error("Error making the API request:", error);
    }
  };

  return (
    <div className="App">
      {/* AI background effect */}
      <Particles
        id="tsparticles"
        options={{
          background: { color: { value: "#0d47a1" } },
          particles: {
            number: { value: 100 },
            size: { value: 3 },
            move: { enable: true, speed: 1.5 },
            color: { value: "#ffffff" },
          },
        }}
      />

      {/* Form Section */}
      <Container maxWidth="sm" style={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{ p: 3, background: "rgba(255, 255, 255, 0.9)", borderRadius: 2 }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Health Input Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Heart Rate"
              name="heart_rate"
              value={formData.heart_rate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <TextField
              label="Systolic Blood Pressure"
              name="systolic_blood_pressure"
              value={formData.systolic_blood_pressure}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <TextField
              label="Diastolic Blood Pressure"
              name="diastolic_blood_pressure"
              value={formData.diastolic_blood_pressure}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <TextField
              label="Oxygen Saturation (%)"
              name="oxygen_saturation"
              value={formData.oxygen_saturation}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <TextField
              label="Respiratory Rate"
              name="resp_rate"
              value={formData.resp_rate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <TextField
              label="Temperature (°C)"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>

          {/* Display the API response */}
          {apiResponse && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">
                Prediction Result:{" "}
                <Typography
                  sx={{ color: apiResponse.pred1 == 1 ? red[700] : green[700] }}
                >
                  {apiResponse.pred}
                </Typography>
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
