import mongoose from "mongoose";

// Schema customer
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

// Model customer
const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
