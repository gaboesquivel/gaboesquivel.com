import { createLibrary, defineComponent } from "@openuidev/lang-core";

import {
  aboutExperiencePropsSchema,
  answerPropsSchema,
  bookingExperiencePropsSchema,
  capabilityShowcasePropsSchema,
  contactExperiencePropsSchema,
  cvExperiencePropsSchema,
  experienceStackPropsSchema,
  projectExperiencePropsSchema,
  writingExperiencePropsSchema,
} from "./schemas";

const noop = () => null;

const Answer = defineComponent({
  component: noop,
  description: "Short prose answer with source references.",
  name: "Answer",
  props: answerPropsSchema,
});

const AboutExperience = defineComponent({
  component: noop,
  description: "About/profile context.",
  name: "AboutExperience",
  props: aboutExperiencePropsSchema,
});

const ProjectExperience = defineComponent({
  component: noop,
  description:
    "Editorial project compositions (bento, feature grid, comparison) from canonical records.",
  name: "ProjectExperience",
  props: projectExperiencePropsSchema,
});

const WritingExperience = defineComponent({
  component: noop,
  description: "Writing list from canonical records.",
  name: "WritingExperience",
  props: writingExperiencePropsSchema,
});

const CapabilityShowcaseExperience = defineComponent({
  component: noop,
  description: "Capability page diagram and evidence grid.",
  name: "CapabilityShowcaseExperience",
  props: capabilityShowcasePropsSchema,
});

const ContactExperience = defineComponent({
  component: noop,
  description: "Contact note form.",
  name: "ContactExperience",
  props: contactExperiencePropsSchema,
});

const BookingExperience = defineComponent({
  component: noop,
  description: "Booking flow with review step.",
  name: "BookingExperience",
  props: bookingExperiencePropsSchema,
});

const CVExperience = defineComponent({
  component: noop,
  description: "CV focus and download links.",
  name: "CVExperience",
  props: cvExperiencePropsSchema,
});

const ExperienceStack = defineComponent({
  component: noop,
  description: "Ordered experiences for multi-intent results.",
  name: "ExperienceStack",
  props: experienceStackPropsSchema,
});

export const genuiContractLibrary = createLibrary({
  components: [
    Answer,
    AboutExperience,
    ProjectExperience,
    WritingExperience,
    CapabilityShowcaseExperience,
    ContactExperience,
    BookingExperience,
    CVExperience,
    ExperienceStack,
  ],
  root: "CVExperience",
});

export const genuiLibraryJsonSchema = () => genuiContractLibrary.toJSONSchema();
