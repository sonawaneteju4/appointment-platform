import { HydratedDocument, Schema, model } from "mongoose";
import { ProviderBusiness } from "../../../domain/enums/provider-business.enum";
import { ProviderType } from "../../../domain/enums/provider-type.enum";
import { ProviderStatus } from "../../../domain/enums/provider-status.enum";

export interface ProviderContactInfo {
  email?: string;

  phone?: string;
}

export interface ProviderLocation {
  address?: string;

  city?: string;

  state?: string;

  zip?: string;

  country?: string;
}

export interface ProviderSocialLink {
  platform: string;

  url: string;
}

export interface ProviderDocument {
  _id: string;
  authUserId: string;
  displayName: string;
  bookingSlug: string;
  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
  website?: string;
  socialLinks: ProviderSocialLink[];

  businessName?: string;

  providerType: ProviderType;

  providerBusiness: ProviderBusiness;

  contactInfo?: ProviderContactInfo;

  location?: ProviderLocation;

  timezone: string;

  status: ProviderStatus;

  isPublic: boolean;

  onboardingCompleted: boolean;

  moderationNotes?: string;

  subscriptionPlan?: string;

  subscriptionExpiresAt?: Date;

  deletedAt?: Date | null;

  createdAt: Date;

  updatedAt: Date;
}

const providerContactInfoSchema = new Schema<ProviderContactInfo>(
  {
    email: {
      type: String,

      trim: true,

      lowercase: true,

      index: true,
    },

    phone: {
      type: String,

      trim: true,

      maxlength: 20,

      index: true,
    },
  },
  {
    _id: false,
  },
);

const providerLocationSchema = new Schema<ProviderLocation>(
  {
    address: {
      type: String,

      trim: true,

      maxlength: 255,
    },

    city: {
      type: String,

      trim: true,

      maxlength: 100,

      index: true,
    },

    state: {
      type: String,

      trim: true,

      maxlength: 100,
    },

    zip: {
      type: String,

      trim: true,

      maxlength: 20,
    },

    country: {
      type: String,

      trim: true,

      maxlength: 100,

      index: true,
    },
  },
  {
    _id: false,
  },
);

const providerSocialLinkSchema = new Schema<ProviderSocialLink>(
  {
    platform: {
      type: String,

      required: true,

      trim: true,

      lowercase: true,

      maxlength: 50,
    },

    url: {
      type: String,

      required: true,

      trim: true,
    },
  },
  {
    _id: false,
  },
);

const ProviderSchema = new Schema<ProviderDocument>(
  {
    authUserId: {
      type: String,

      required: true,

      index: true,
    },

    displayName: {
      type: String,

      required: true,

      trim: true,

      minlength: 2,

      maxlength: 100,
    },

    bookingSlug: {
      type: String,

      required: true,

      unique: true,

      index: true,

      trim: true,

      lowercase: true,

      minlength: 3,

      maxlength: 80,

      match: /^[a-z0-9-]+$/,
    },

    logoUrl: {
      type: String,

      trim: true,
    },

    bannerUrl: {
      type: String,

      trim: true,
    },

    description: {
      type: String,

      trim: true,

      maxlength: 1000,
    },

    website: {
      type: String,

      trim: true,
    },

    socialLinks: {
      type: [providerSocialLinkSchema],

      default: [],
    },

    businessName: {
      type: String,

      trim: true,

      maxlength: 150,
    },

    providerType: {
      type: String,

      enum: Object.values(ProviderType),

      required: true,

      trim: true,

      index: true,
    },

    providerBusiness: {
      type: String,

      enum: Object.values(ProviderBusiness),

      required: true,

      trim: true,

      index: true,
    },

    contactInfo: {
      type: providerContactInfoSchema,

      default: undefined,
    },

    location: {
      type: providerLocationSchema,

      default: undefined,
    },

    timezone: {
      type: String,

      required: true,

      trim: true,

      default: "Asia/Kolkata",
    },

    status: {
      type: String,

      enum: Object.values(ProviderStatus),

      default: ProviderStatus.DRAFT,

      index: true,
    },

    isPublic: {
      type: Boolean,

      default: false,

      index: true,
    },

    onboardingCompleted: {
      type: Boolean,

      default: false,
    },

    moderationNotes: {
      type: String,

      trim: true,

      maxlength: 1000,

      select: false,
    },

    subscriptionPlan: {
      type: String,

      trim: true,

      select: false,
    },

    subscriptionExpiresAt: {
      type: Date,

      select: false,
    },

    deletedAt: {
      type: Date,

      default: null,

      index: true,
    },
  },
  {
    timestamps: true,

    versionKey: false,
  },
);

ProviderSchema.index({
  bookingSlug: 1,
});

ProviderSchema.index({
  authUserId: 1,
});

ProviderSchema.index({
  status: 1,
  isPublic: 1,
});

ProviderSchema.index({
  providerType: 1,
});

ProviderSchema.index({
  providerBusiness: 1,
});

ProviderSchema.index({
  "location.city": 1,
});

export type ProviderHydratedDocument = HydratedDocument<ProviderDocument>;

export const ProviderModel = model<ProviderDocument>(
  "Provider",
  ProviderSchema,
);
