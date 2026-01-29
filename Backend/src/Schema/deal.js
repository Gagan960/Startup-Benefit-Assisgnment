import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 120
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxLength: 60
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    maxLength: 240
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 5000
  },
  partnerName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 120
  },
  partnerWebsiteUrl: {
    type: String,
    required: false,
    trim: true,
    maxLength: 500
  },
  logoUrl: {
    type: String,
    required: false,
    trim: true,
    maxLength: 500
  },
  eligibility: {
    type: String,
    required: true,
    trim: true,
    maxLength: 2000
  },
  redemptionInstructions: {
    type: String,
    required: true,
    trim: true,
    maxLength: 3000
  },
  isLocked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Deal = mongoose.model("Deal", dealSchema);

export default Deal;
