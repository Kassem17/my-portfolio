import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    position: {
      type: String,
    },
  },
  { timestamps: true }
);

const Testimonials = mongoose.model("Testimonials", testimonialSchema);

export default Testimonials;
