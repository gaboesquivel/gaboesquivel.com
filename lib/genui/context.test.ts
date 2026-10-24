import { describe, expect, test } from "bun:test";

import { getProjectBySlug, projects } from "gaboesquivel";

import { buildEvidencePacket, evidenceExcerpt } from "./context";
import { projectToPublicRecord } from "./public-records";

describe("semantic evidence", () => {
  test("hydrates canonical responsibilities, technologies and source text", () => {
    const project = getProjectBySlug("wink");
    if (!project) throw new Error("expected wink project");
    const packet = buildEvidencePacket({
      query: "banking integration",
      records: [projectToPublicRecord(project)],
    });
    expect(packet.records[0].summary).toBe(project.description);
    expect(packet.records[0].facts?.role).toBe(project.role);
    expect(packet.records[0].facts?.technologies).toEqual(project.tech);
    expect(packet.records[0].excerpt.length).toBeGreaterThan(100);
    expect(packet.records[0].source).toBe(project.markdownPath);
    expect(packet.catalog.projectCount).toBe(
      new Set(projects.map((p) => p.slug)).size
    );
    expect(packet.catalog.projectCount).toBeGreaterThan(packet.records.length);
  });

  test("does not hydrate a mismatched slug as verified project evidence", () => {
    const packet = buildEvidencePacket({
      query: "work",
      records: [
        {
          kind: "project",
          id: "/project/unknown",
          slug: "wink",
          title: "Unknown",
          description: "",
          url: "/project/unknown",
        },
      ],
    });
    expect(packet.records[0].facts).toBeUndefined();
    expect(packet.records[0].excerpt).toBe("");
  });

  test("bounds source material and reports omitted records", () => {
    const packet = buildEvidencePacket({
      query: "projects",
      records: projects.map(projectToPublicRecord),
    });
    expect(packet.records.length).toBeLessThanOrEqual(12);
    expect(JSON.stringify(packet.records).length).toBeLessThan(28_100);
    expect(packet.omittedRecordIds.length).toBeGreaterThan(0);
  });

  test("selects relevant complete paragraphs without manufacturing source text", () => {
    const relevant = "A documented production incident and its resolution.";
    const excerpt = evidenceExcerpt(
      `${"Background. ".repeat(300)}\n\n${relevant}`,
      "production incident"
    );
    expect(excerpt).toBe(relevant);
  });
});
