"use client";

import { createLibrary, defineComponent } from "@openuidev/react-lang";
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
} from "lib/genui/contract/schemas";

import {
  AboutExperienceView,
  AnswerView,
  BookingExperienceView,
  CapabilityShowcaseExperienceView,
  ContactExperienceView,
  CvExperienceView,
  ExperienceStackView,
  ProjectExperienceView,
  WritingExperienceView,
} from "./genui-experience-views";

const Answer = defineComponent({
  component: ({ props }) => (
    <AnswerView body={props.body} sourceIds={props.sourceIds} />
  ),
  description: "Short prose answer with source references.",
  name: "Answer",
  props: answerPropsSchema,
});

const CVExperience = defineComponent({
  component: ({ props }) => (
    <CvExperienceView composite={props.composite} sourceId={props.sourceId} />
  ),
  description: "CV focus and download links.",
  name: "CVExperience",
  props: cvExperiencePropsSchema,
});

const ProjectExperience = defineComponent({
  component: ({ props }) => (
    <ProjectExperienceView
      composite={props.composite}
      projectIds={props.projectIds}
    />
  ),
  description: "Project cards from canonical records.",
  name: "ProjectExperience",
  props: projectExperiencePropsSchema,
});

const WritingExperience = defineComponent({
  component: ({ props }) => (
    <WritingExperienceView
      composite={props.composite}
      postIds={props.postIds}
    />
  ),
  description: "Writing list from canonical records.",
  name: "WritingExperience",
  props: writingExperiencePropsSchema,
});

const CapabilityShowcaseExperience = defineComponent({
  component: ({ props }) => (
    <CapabilityShowcaseExperienceView
      domain={props.domain}
      projectIds={props.projectIds}
    />
  ),
  description: "Capability page diagram and evidence grid.",
  name: "CapabilityShowcaseExperience",
  props: capabilityShowcasePropsSchema,
});

const AboutExperience = defineComponent({
  component: ({ props }) => <AboutExperienceView sourceId={props.sourceId} />,
  description: "About/profile context.",
  name: "AboutExperience",
  props: aboutExperiencePropsSchema,
});

const ContactExperience = defineComponent({
  component: ({ props }) => (
    <ContactExperienceView contextId={props.contextId} />
  ),
  description: "Contact note form.",
  name: "ContactExperience",
  props: contactExperiencePropsSchema,
});

const BookingExperience = defineComponent({
  component: () => <BookingExperienceView />,
  description: "Booking flow with review step.",
  name: "BookingExperience",
  props: bookingExperiencePropsSchema,
});

const ExperienceStack = defineComponent({
  component: ({ props }) => <ExperienceStackView segments={props.segments} />,
  description: "Ordered experiences for multi-intent results.",
  name: "ExperienceStack",
  props: experienceStackPropsSchema,
});

export const genuiLibrary = createLibrary({
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
