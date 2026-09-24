import { z } from "zod";
import { ProviderType } from "../../../domain/enums/provider-type.enum";
import { ProviderBusiness } from "../../../domain/enums/provider-business.enum";

// -----------------------------
// Nested Schemas
// -----------------------------

const socialLinkSchema = z.object({
  platform: z.string().trim().min(1).max(50),

  url: z.string().trim().url(),
});

const contactInfoSchema = z.object({
  email: z.email().trim().toLowerCase().optional(),

  phone: z.string().trim().max(20).optional(),
});

const locationSchema = z.object({
  address: z.string().trim().max(255).optional(),

  city: z.string().trim().max(100).optional(),

  state: z.string().trim().max(100).optional(),

  zip: z.string().trim().max(20).optional(),

  country: z.string().trim().max(100).optional(),
});

// -----------------------------
// Main Validation Schema
// -----------------------------

export const createProviderSchema = z.object({
  displayName: z.string().trim().min(2).max(100),

  bookingSlug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(80)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers and hyphens",
    ),

  description: z.string().trim().max(1000).optional(),

  logoUrl: z.string().trim().url().optional(),

  bannerUrl: z.string().trim().url().optional(),

  website: z.string().trim().url().optional(),

  socialLinks: z.array(socialLinkSchema).default([]),

  businessName: z.string().trim().max(150).optional(),

  providerType: z.enum(ProviderType),

  providerBusiness: z.enum(ProviderBusiness),

  contactInfo: contactInfoSchema.optional(),

  location: locationSchema.optional(),

  timezone: z.string().trim().default("Asia/Kolkata"),
});

// -----------------------------
// DTO Type Inference
// -----------------------------

export type CreateProviderDto = z.infer<typeof createProviderSchema>;
