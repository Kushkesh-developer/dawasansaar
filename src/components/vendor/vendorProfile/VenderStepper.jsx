import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Paper, Divider } from "@mui/material";

const steps = ["Business Details", "Legal Documents", "Contact Info", "Bank Details"];

const VendorStepper = ({ children, activeStep, handleNext, handleBack, onSubmit }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: "auto" }}>
      <Box sx={{ mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Divider sx={{ mb: 3 }} />
      {children}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? onSubmit : handleNext}
        >
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Paper>
  );
};

export default VendorStepper;