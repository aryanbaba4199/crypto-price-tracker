import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPriceData extends Document {
  symbol: string;
  price: number;
  timestamp: Date;
}

const priceSchema: Schema<IPriceData> = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

const PriceData: Model<IPriceData> = mongoose.models.PriceData || mongoose.model<IPriceData>('PriceData', priceSchema);

export default PriceData;
