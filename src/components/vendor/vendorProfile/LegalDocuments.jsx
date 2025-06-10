import { Box, Typography } from "@mui/material";
import DocumentUpload from "./DocumentUpload";
import StatusChip from "./StatusChip";

const documentTypes = [
  { id: "gst", label: "GST Certificate" },
  { id: "pan", label: "PAN Card" },
  { id: "aadhaar", label: "Aadhaar Card" },
];

const LegalDocuments = ({ formData, onDocumentUpload, documentStatus }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {documentTypes.map((doc) => (
        <Box key={doc.id} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">{doc.label}</Typography>
          <DocumentUpload
            onDrop={(files) => onDocumentUpload(files, doc.id)}
            file={formData.documents[doc.id]}
          />
          <StatusChip status={documentStatus[doc.id]} />
        </Box>
      ))}
    </Box>
  );
};

export default LegalDocuments;