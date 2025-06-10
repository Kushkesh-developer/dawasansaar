import { Chip } from "@mui/material";

const statusColors = {
  pending: "warning",
  verified: "success",
  rejected: "error",
};

const StatusChip = ({ status }) => (
  <Chip
    label={status}
    color={statusColors[status] || "default"}
    sx={{ mt: 1, textTransform: "capitalize" }}
  />
);

export default StatusChip;