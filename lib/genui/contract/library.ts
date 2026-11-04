import { createLibrary, defineComponent } from "@openuidev/lang-core";

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
  dataBoardPropsSchema,
  dataChartPropsSchema,
  dataTablePropsSchema,
  statRowPropsSchema,
  viewExperiencePropsSchema,
  writingExperiencePropsSchema,
} from "./schemas";

const noop = () => null;

const Answer = defineComponent({
  component: noop,
  description: "Short prose answer with source references.",
  name: "Answer",
  props: answerPropsSchema,
});

const TimelineExperience = defineComponent({
  component: noop,
  description:
    "Career chronology with grounded project evidence, chapter navigation and expandable stories.",
  name: "TimelineExperience",
  props: timelineExperiencePropsSchema,
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

const DataTable = defineComponent({
  component: noop,
  description:
    "Sortable table of one dataset. Columns name dataset column keys; omit for all.",
  name: "DataTable",
  props: dataTablePropsSchema,
});

const DataChart = defineComponent({
  component: noop,
  description:
    "Bar, line, area or pie chart of a grouped dataset (label and count columns).",
  name: "DataChart",
  props: dataChartPropsSchema,
});

const StatRow = defineComponent({
  component: noop,
  description: "Up to four headline numbers from the overview dataset.",
  name: "StatRow",
  props: statRowPropsSchema,
});

const DataBoard = defineComponent({
  component: noop,
  description:
    "Read-only board: dataset rows as cards in columns grouped by a text column.",
  name: "DataBoard",
  props: dataBoardPropsSchema,
});

const ViewExperience = defineComponent({
  component: noop,
  description:
    "Requested-form view: tables, charts, stats or a board arranged by an approved arrangement. Blocks only name datasets the application computed.",
  name: "ViewExperience",
  props: viewExperiencePropsSchema,
});

export const genuiContractLibrary = createLibrary({
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
    ViewExperience,
    DataTable,
    DataChart,
    StatRow,
    DataBoard,
  ],
  root: "CVExperience",
});

export const genuiLibraryJsonSchema = () => genuiContractLibrary.toJSONSchema();
