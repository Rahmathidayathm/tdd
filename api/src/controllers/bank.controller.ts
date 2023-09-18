// import { Controller, Get, Post, Put, Response, Request } from "express";
import { Controller, Get, Post, Put, Response, Request } from 'express';
import Bank from "../models/bank.model";

@Controller("banks")
export class BankController {
  @Get("")
  index() {
    // Ambil daftar bank dari database
    const banks = Bank.find();

    // Kembalikan daftar bank
    return banks;
  }

  @Post("")
   create(req: Request, res: Response, data: any) {
    // Validasi data
    if (!data.name || data.name.length < 3) {
      res.status(400).send({ message: "Nama bank harus diisi dan minimal 3 karakter." });
      return;
    }

    // Buat objek bank baru
    const bank = new Bank({
      name: data.name,
      address: data.address,
      branch: data.branch,
    });

    // Simpan bank ke database
    bank.save();

    // Kembalikan data bank yang baru dibuat
    res.status(201).json(bank);
  }

  @Put("/:id")
  async update(req: Request, res: Response, id: number, data: any) {
    // Validasi data
    if (!data.name || data.name.length < 3) {
      res.status(400).send({ message: "Nama bank harus diisi dan minimal 3 karakter." });
      return;
    }

    // Cari bank berdasarkan ID
    const bank = await Bank.findById(id);

    // Jika bank tidak ditemukan
    if (!bank) {
      res.status(404).send({ message: "Bank tidak ditemukan." });
      return;
    }

    // Perbarui data bank
    bank.name = data.name;
    bank.address = data.address;

    // Simpan perubahan ke database
    await bank.save();

    // Kembalikan data bank yang telah diperbarui
    res.status(200).json(bank);
  }
}
