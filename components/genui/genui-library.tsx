"use client";

import { createLibrary, defineComponent } from "@openuidev/react-lang";
import {
  timelineExperiencePropsSchema,
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

import { CareerTimeline } from "./career-timeline";
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
      dimensions={props.dimensions}
      domain={props.domain}
      projectIds={props.projectIds}
    />
  ),
  description:
    "Editorial project compositions (bento, feature grid, comparison) from canonical records.",
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

const TimelineExperience = defineComponent({
  component: ({ props }) => (
    <CareerTimeline sourceId={props.sourceId} projectIds={props.projectIds} />
  ),
  description:
    "Career chronology with grounded project evidence, chapter navigation and expandable stories.",
  name: "TimelineExperience",
  props: timelineExperiencePropsSchema,
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
  component: ({ props }) => (
    <ExperienceStackView
      items={Array.isArray(props.children) ? props.children : []}
    />
  ),
  description: "Ordered experiences for multi-intent results.",
  name: "ExperienceStack",
  props: experienceStackPropsSchema,
});

export const genuiLibrary = createLibrary({
  components: [
    Answer,
    AboutExperience,
    TimelineExperience,
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
