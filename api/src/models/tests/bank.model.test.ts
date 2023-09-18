import { expect } from "chai";
import Bank from "../bank.model";

describe("Bank model validation", () => {
  it("should validate a valid bank", async () => {
    const bank = new Bank({
      name: "Bank Rakyat Indonesia",
      address: "Jalan Thamrin No. 1, Jakarta",
      city: "Jakarta"
    });

    await bank.validate();

    expect(bank.errors).to.be.empty;
  });

  it("should not validate a bank with an empty name", async () => {
    const bank = new Bank({
      name: "",
      address: "Jalan Thamrin No. 1, Jakarta",
      city: "Jakarta"
    });

    try {
      await bank.validate();
    } catch (error) {
      expect(error.errors.name).to.eql(["name is required"]);
    }
  });

  it("should not validate a bank with an empty address", async () => {
    const bank = new Bank({
      name: "Bank Rakyat Indonesia",
      address: "",
      city: "Jakarta"
    });

    try {
      await bank.validate();
    } catch (error) {
      expect(error.errors.address).to.eql(["address is required"]);
    }
  });

  it("should not validate a bank with an empty city", async () => {
    const bank = new Bank({
      name: "Bank Rakyat Indonesia",
      address: "Jalan Thamrin No. 1, Jakarta",
      city: ""
    });

    try {
      await bank.validate();
    } catch (error) {
      expect(error.errors.city).to.eql(["city is required"]);
    }
  });
});
