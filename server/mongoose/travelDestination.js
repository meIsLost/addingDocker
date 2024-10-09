import mongoose from "mongoose";
const { Schema } = mongoose;

const travelDestinationSchema = new Schema({
  country: String,
  location: String,
  startDate: { type: Date },
  endDate: { type: Date },
  image: {
    data: Buffer,
    contentType: String,
  },
  description: String,
});

module.exports = mongoose.model("TravelDestination", travelDestinationSchema);
