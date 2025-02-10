import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Industrial Shed', 'Factory', 'Warehouse', 'Office Space', 'Land', 'Industrial Plot'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    },
    address: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
      required: true,
    },
  },
  area: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ['sq.ft', 'sq.m', 'hectare', 'acre', 'guntha'],
      required: true,
    },
  },
  plotSize: {
    value: {
      type: Number,
      required: false,
    },
    unit: {
      type: String,
      enum: ['sq.ft', 'sq.m', 'hectare', 'acre', 'guntha'],
      required: false,
    },
  },
  specifications: {
    floorHeight: {
      value: {
        type: Number,
        required: false,
      },
      unit: {
        type: String,
        enum: ['ft', 'm'],
        default: 'ft',
      },
    },
    power: {
      value: {
        type: Number,
        required: false,
      },
      unit: {
        type: String,
        enum: ['HP', 'KW', 'KVA'],
        default: 'KVA',
      },
    },
    facing: {
      type: String,
      enum: ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'],
      required: false,
    },
    floorNumber: {
      type: Number,
      required: false,
    },
    parking: {
      cars: {
        type: Number,
        default: 0,
      },
      trucks: {
        type: Number,
        default: 0,
      },
      containerMovement: {
        type: Boolean,
        default: false,
      },
    },
    loadingPlatform: {
      available: {
        type: Boolean,
        default: false,
      },
      count: {
        type: Number,
        default: 0,
      },
      height: {
        value: {
          type: Number,
          required: false,
        },
        unit: {
          type: String,
          enum: ['ft', 'm'],
          default: 'ft',
        },
      },
    },
  },
  features: [{
    type: String,
  }],
  images: [{
    url: String,
    alt: String,
  }],
  status: {
    type: String,
    enum: ['available', 'under-contract', 'sold', 'leased'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create geospatial index on location.coordinates
propertySchema.index({ 'location.coordinates': '2dsphere' });

// Update timestamps on save
propertySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export default Property;
