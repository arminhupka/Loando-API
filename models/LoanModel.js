import mongoose from 'mongoose';

const LoanModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    value: {
      type: Number,
      required: true,
    },
    toPay: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    paid: {
      type: Number,
      default: 0,
    },
    commission: {
      type: Number,
    },
    interest: {
      type: Number,
      required: true,
    },
    rrso: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    payments: {
      type: Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Loan = mongoose.model('Loan', LoanModel);

export default Loan;
