import mongoose from "mongoose";

// Schema invoice
const invoiceSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

// Model invoice
const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
