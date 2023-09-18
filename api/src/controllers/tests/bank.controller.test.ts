import { expect } from "chai";
import { BankController } from "../bank.controller";
import Bank from "../../models/bank.model";
import { request } from "http";

describe("BankController", () => {
  const bankController = new BankController();

  describe("index()", () => {
    it("should return a list of banks", async () => {
      // Buat beberapa bank
      const banks = [
      new Bank({ name: "Bank Rakyat Indonesia", address: "Jalan Thamrin No. 1, Jakarta", branch: "Jakarta" }),
      new Bank({ name: "Bank Tabungan Negara", address: "Jalan Sudirman No. 1, Jakarta", branch: "Jakarta" }),
      ];

      // Simpan bank ke database
      await Promise.all(banks.map((bank) => bank.save()));

      // Kembalikan daftar bank
      const returnedBanks = await bankController.index();

      // Bandingkan daftar bank
      expect(returnedBanks).to.deep.equal(banks);
    });
  });

  describe("create()", () => {
    it("should create a new bank", async () => {
    // Buat data bank baru
    const data = { name: "Bank Mandiri", address: "Jalan Gatot Subroto No. 1, Jakarta", branch: "Jakarta" };

      // Buat bank baru
      const newBank = await bankController.create(null, null, data);

      // Bandingkan bank baru dengan data
      expect(newBank['name']).to.equal(data.name);
      expect(newBank['address']).to.equal(data.address);
      expect(newBank['branch']).to.equal(data.branch);
    });

    it("should not create a bank with an empty name", async () => {
      // Buat data bank baru dengan nama kosong
      const data = { name: "", address: "Jalan Gatot Subroto No. 1, Jakarta", branch: "Jakarta" };

      try {
        await bankController.create(null, null, data);
      } catch (error) {
        expect(error.status).to.equal(400);
        expect(error.message).to.equal("Nama bank harus diisi dan minimal 3 karakter.");
      }
    });
  });

  describe("update()", () => {
    it("should update an existing bank", async () => {
      // Buat bank baru
      const bank = new Bank({ name: "Bank Rakyat Indonesia", address: "Jalan Thamrin No. 1, Jakarta", branch: "Jakarta" });

      // Simpan bank ke database
      await bank.save();

      // Perbarui nama bank
      const data = { name: "Bank Tabungan Negara" };

      // Perbarui bank
      await bankController.update(request, Response, bank.id, data);

      // Bandingkan bank yang diperbarui dengan data
      const updatedBank = await Bank.findById(bank.id);
      expect(updatedBank?.name).to.equal(data.name);
      expect(updatedBank?.address).to.equal(bank.address);
      expect(updatedBank?.branch).to.equal(bank.branch);
    });

    it("should not update a bank with an empty name", async () => {
      // Buat bank baru
      const bank = new Bank({ name: "Bank Rakyat Indonesia", address: "Jalan Thamrin No. 1, Jakarta", branch: "Jakarta" });

      // Simpan bank ke database
      await bank.save();

      // Perbarui nama bank dengan nama kosong
      const data = { name: "" };

      try {
        await bankController.update(Request, Response, bank.id, data);
      } catch (error) {
        expect(error.status).to.equal(400);
        expect(error.message).to.equal("Nama bank harus diisi dan minimal 3 karakter.");
      }
    });
  });
});