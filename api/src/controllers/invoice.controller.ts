import { Request, Response } from "express";
import InvoiceModel from "../models/invoice.model";
import CustomerModel from "../models/customer.model";

export class InvoiceController {
  async index(req: Request, res: Response): Promise<void> {
    const invoices = await InvoiceModel.find();

    const response = invoices.map(async (invoice) => {
      const customer = await CustomerModel.findById(invoice.customerId);
      return {
        _id: invoice._id,
        customer: {
          name: customer?.name,
          phone: customer?.phone,
        },
        date: invoice.date,
        total: invoice.total,
      };
    });

    res.json(response);
  }
}