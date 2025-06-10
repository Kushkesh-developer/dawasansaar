import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";

const DocumentUpload = ({ onDrop, file }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*,.pdf",
    maxFiles: 1,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "1px dashed #ccc",
        borderRadius: 1,
        p: 2,
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <input {...getInputProps()} />
      {file ? (
        <Typography>{file.name}</Typography>
      ) : (
        <>
          <CloudUploadIcon fontSize="large" />
          <Typography>Drag & drop file here, or click to select</Typography>
        </>
      )}
    </Box>
  );
};

export default DocumentUpload;