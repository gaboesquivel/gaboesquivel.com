import { z } from "zod";

import { comparisonDimensions } from "../comparison-dimensions";
import { compositeNames } from "../composites";

export const compositeSchema = z.enum(compositeNames);

export const answerPropsSchema = z.object({
  body: z.string(),
  sourceIds: z.array(z.string()).default([]),
});

export const timelineExperiencePropsSchema = z.object({
  composite: z.literal("chapter-stack"),
  sourceId: z.literal("/bio"),
  projectIds: z.array(z.string()),
});

export const aboutExperiencePropsSchema = z.object({
  sourceId: z.string(),
});

export const projectExperiencePropsSchema = z.object({
  composite: compositeSchema.default("editorial-grid"),
  projectIds: z.array(z.string()),
  domain: z.enum(["ai", "web3", "all"]).optional(),
  /** project-comparison only: requested dimensions, in display order. */
  dimensions: z.array(z.enum(comparisonDimensions)).optional(),
});

export const writingExperiencePropsSchema = z.object({
  composite: compositeSchema.default("dated-row"),
  postIds: z.array(z.string()),
});

export const capabilityShowcasePropsSchema = z.object({
  domain: z.enum(["ai", "web3"]),
  projectIds: z.array(z.string()),
});

export const contactExperiencePropsSchema = z.object({
  composite: compositeSchema.optional(),
  contextId: z.string(),
});

export const bookingExperiencePropsSchema = z.object({
  composite: compositeSchema.optional(),
});

export const cvExperiencePropsSchema = z.object({
  composite: compositeSchema.default("cv-document"),
  focus: z.string().optional(),
  sourceId: z.string(),
});

export const experienceStackPropsSchema = z.object({
  children: z.array(z.unknown()).default([]),
});
