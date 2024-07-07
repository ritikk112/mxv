const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  profile: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String
    },
    avatarUrl: {
      type: String
    }
  },
  preferences: {
    language: {
      type: String
    },
    genres: [{
      type: String
    }],
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  },
  watchlist: [{
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  watched: [{
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie'
    },
    watchedAt: {
      type: Date,
      default: Date.now
    },
    rating: {
      type: Number,
      min: 0,
      max: 10
    },
    review: {
      type: String
    }
  }],
  subscription: {
    plan: {
      type: String
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'canceled']
    },
    startedAt: {
      type: Date
    },
    expiresAt: {
      type: Date
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  roles: [{
    type: String,
    enum: ['user', 'admin']
  }],
  loginHistory: [{
    loginAt: {
      type: Date,
      default: Date.now
    },
    ipAddress: {
      type: String
    },
    device: {
      type: String
    },
    location: {
      latitude: {
        type: Number
      },
      longitude: {
        type: Number
      }
    }
  }]
});

// Middleware to update updatedAt field on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the User model from the schema and export it
const User = mongoose.model('User', userSchema);
module.exports = User;
