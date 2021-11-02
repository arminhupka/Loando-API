import mongoose from 'mongoose';

const UserModel = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    pesel: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: Number,
      required: true,
    },
    flatNumber: {
      type: Number,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    loans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan',
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    accountNumber: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model('User', UserModel);

export default User;
