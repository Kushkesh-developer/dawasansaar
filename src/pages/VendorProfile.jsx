import React, { useState } from "react";
import VendorStepper from "../components/vendor/vendorProfile/VenderStepper";
import BusinessDetails from "../components/vendor/vendorProfile/BusinessDetails";
import LegalDocuments from "../components/vendor/vendorProfile/LegalDocuments";
import ContactInfo from "../components/vendor/vendorProfile/ContactInfo";
import BankDetails from "../components/vendor/vendorProfile/BankDetails";

const VendorProfilePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    documents: {},
    phone: "",
    email: "",
    deliveryCapacity: "",
    accountNumber: "",
    ifscCode: "",
  });
  const [documentStatus, setDocumentStatus] = useState({
    gst: "pending",
    pan: "pending",
    aadhaar: "pending",
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleSubmit = () => alert("API call to submit form data");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDocumentUpload = (files, docId) => {
    setFormData({
      ...formData,
      documents: { ...formData.documents, [docId]: files[0] },
    });
    // Simulate verification API call
    setTimeout(() => {
      setDocumentStatus({ ...documentStatus, [docId]: "verified" });
    }, 1500);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <BusinessDetails formData={formData} handleChange={handleChange} />;
      case 1:
        return (
          <LegalDocuments
            formData={formData}
            onDocumentUpload={onDocumentUpload}
            documentStatus={documentStatus}
          />
        );
      case 2:
        return <ContactInfo formData={formData} handleChange={handleChange} />;
      case 3:
        return <BankDetails formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <VendorStepper
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      onSubmit={handleSubmit}
    >
      {renderStepContent(activeStep)}
    </VendorStepper>
  );
};

export default VendorProfilePage;