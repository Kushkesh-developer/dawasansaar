import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Rating,
  Typography,
  Box,
  FormControl,
  FormLabel,
  Stack,
  IconButton,
} from "@mui/material";
import { Star, StarBorder, Close } from "@mui/icons-material";

const ReviewForm = ({ productName, onSubmitReview }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Please provide a rating");
      return;
    }
    
    if (review.trim() === "") {
      alert("Please write a review");
      return;
    }

    const reviewData = {
      rating,
      title: reviewTitle,
      review: review.trim(),
      productName,
      timestamp: new Date().toISOString(),
    };

    console.log("Submitting review:", reviewData);
    
    // Call the parent callback
    if (onSubmitReview) {
      onSubmitReview(reviewData);
    }

    // Reset form
    setRating(0);
    setReview("");
    setReviewTitle("");
    setIsOpen(false);
    
    alert("Review submitted successfully!");
  };

  const handleCancel = () => {
    setRating(0);
    setReview("");
    setReviewTitle("");
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Star />}
        onClick={() => setIsOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Review
      </Button>

      <Dialog 
        open={isOpen} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle sx={{ p: 2, pb: 1 }}>
            Write a Review
          </DialogTitle>
          <IconButton 
            onClick={handleClose}
            sx={{ mr: 1 }}
            size="small"
          >
            <Close />
          </IconButton>
        </Box>
        
        <DialogContent sx={{ pt: 0 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Share your experience with {productName}
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend" required>
                  <Typography variant="body2" fontWeight={500}>
                    Rating
                  </Typography>
                </FormLabel>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                  <Rating
                    name="product-rating"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    size="large"
                    precision={1}
                    icon={<Star fontSize="inherit" />}
                    emptyIcon={<StarBorder fontSize="inherit" />}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {rating > 0 ? `${rating} out of 5` : "Select rating"}
                  </Typography>
                </Box>
              </FormControl>

              <TextField
                label="Review Title"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Summarize your review in a few words"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 100 }}
                helperText={`${reviewTitle.length}/100 characters`}
              />

              <TextField
                label="Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your detailed review here..."
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                required
                inputProps={{ maxLength: 500 }}
                helperText={`${review.length}/500 characters`}
              />
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={handleCancel}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewForm;