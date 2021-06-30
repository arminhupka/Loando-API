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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Loan = mongoose.model('Loan', LoanModel);

export default Loan;
