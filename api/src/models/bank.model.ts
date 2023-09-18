import mongoose, { Schema } from "mongoose";

const bankSchema = mongoose.model('bank', new Schema({
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    code: {
      type: String,
    },
    branch: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    fax: {
      type: String,
    },
    notes: {
      type: String,
    },
    accounts: {
      type: mongoose.Schema.Types.Array,
      default: [],
      items: {
        type: mongoose.Schema.Types.Array,
        required: ["name", "notes"],
        properties: {
          name: { type: String, required: true },
          notes: { type: String },
        },
      },
    },
    createdBy_id: {
      type: mongoose.Schema.ObjectId,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedBy_id: {
      type: mongoose.Schema.ObjectId,
    },
    updatedAt: {
      type: Date,
    },
    archievedBy_id: {
      type: mongoose.Schema.ObjectId,
    },
    archievedAt: {
      type: Date,
    },
    requestApprovalDeleteTo_id: {
      type: mongoose.Schema.ObjectId,
    },
    requestApprovalDeleteAt: {
      type: Date,
    },
    requestApprovalDeleteReason: {
      type: String,
    },
    requestApprovalDeleteStatus: {
      type: String
    },
  }));
// const bookSchema = mongoose.model('ban')

export default bankSchema;