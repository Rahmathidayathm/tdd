import { Schema, model } from "mongoose";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z]+$/,
    message: "Nama harus alfanumerik.",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        );
      },
      message: "Email tidak valid.",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.pre("save", async function () {
  const user = await User.findOne({ phone: this.phone });
  if (user && user._id != this._id) {
    throw new Error("Nomor telepon sudah ada.");
  }
});

export const User = model<User>("User", userSchema);
