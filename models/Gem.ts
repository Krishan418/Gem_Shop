import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGem extends Document {
  title: string;
  slug: string;
  sku: string;
  species?: string;
  variety?: string;
  origin: string;
  caratWeight: number;
  cut: string;
  color?: string;
  clarity?: string;
  dimensions?: string;
  treatment?: string;
  labCertificate: string;
  labReportNumber?: string;
  price: number;
  image: string;
  images?: string[];
  status: 'available' | 'sold' | 'reserved';
  description?: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const GemSchema = new Schema<IGem>(
  {
    title: {
      type: String,
      required: [true, 'Gem title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      index: true,
    },
    sku: {
      type: String,
      trim: true,
      index: true,
    },
    species: {
      type: String,
      trim: true,
    },
    variety: {
      type: String,
      trim: true,
    },
    origin: {
      type: String,
      required: [true, 'Origin is required'],
      trim: true,
    },
    caratWeight: {
      type: Number,
      required: [true, 'Carat weight is required'],
      min: 0.01,
    },
    cut: {
      type: String,
      required: [true, 'Cut shape is required'],
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    clarity: {
      type: String,
      trim: true,
    },
    dimensions: {
      type: String,
      trim: true,
    },
    treatment: {
      type: String,
      default: 'Unheated / Untreated',
    },
    labCertificate: {
      type: String,
      required: [true, 'Lab certificate is required'],
      trim: true,
    },
    labReportNumber: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    image: {
      type: String,
      required: [true, 'Primary image URL is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'reserved'],
      default: 'available',
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model in development hot reloading
const Gem: Model<IGem> = (mongoose.models.Gem as Model<IGem>) || mongoose.model<IGem>('Gem', GemSchema);

export default Gem;
