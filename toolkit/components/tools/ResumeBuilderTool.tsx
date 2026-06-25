"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { ToolInput, ToolTextarea, ToolButton } from "@/components/tools/ui";
import { downloadBlob } from "@/lib/utils";

interface Experience {
  id: number;
  company: string;
  title: string;
  dates: string;
  description: string;
}

interface Education {
  id: number;
  school: string;
  degree: string;
  dates: string;
}

export default function ResumeBuilderTool() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1, company: "", title: "", dates: "", description: "" },
  ]);
  const [education, setEducation] = useState<Education[]>([
    { id: 1, school: "", degree: "", dates: "" },
  ]);

  const addExperience = () => {
    setExperiences((e) => [...e, { id: Date.now(), company: "", title: "", dates: "", description: "" }]);
  };

  const addEducation = () => {
    setEducation((e) => [...e, { id: Date.now(), school: "", degree: "", dates: "" }]);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    let y = 20;
    const lineHeight = 7;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(name || "Your Name", margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const contact = [email, phone, location, website].filter(Boolean).join("  |  ");
    if (contact) {
      doc.text(contact, margin, y);
      y += lineHeight + 2;
    }

    if (summary) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Summary", margin, y);
      y += lineHeight;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(summary, pageWidth - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * lineHeight + 4;
    }

    const expList = experiences.filter((e) => e.company || e.title);
    if (expList.length > 0) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Experience", margin, y);
      y += lineHeight;
      for (const exp of expList) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(`${exp.title}${exp.company ? ` — ${exp.company}` : ""}`, margin, y);
        y += lineHeight;
        if (exp.dates) {
          doc.setFontSize(9);
          doc.setFont("helvetica", "italic");
          doc.text(exp.dates, margin, y);
          y += lineHeight;
        }
        if (exp.description) {
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          const lines = doc.splitTextToSize(exp.description, pageWidth - margin * 2);
          doc.text(lines, margin, y);
          y += lines.length * lineHeight;
        }
        y += 3;
        if (y > 270) { doc.addPage(); y = 20; }
      }
      y += 2;
    }

    const eduList = education.filter((e) => e.school || e.degree);
    if (eduList.length > 0) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Education", margin, y);
      y += lineHeight;
      for (const edu of eduList) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(`${edu.degree}${edu.school ? ` — ${edu.school}` : ""}`, margin, y);
        y += lineHeight;
        if (edu.dates) {
          doc.setFontSize(9);
          doc.setFont("helvetica", "italic");
          doc.text(edu.dates, margin, y);
          y += lineHeight + 2;
        }
      }
    }

    if (skills) {
      if (y > 250) { doc.addPage(); y = 20; }
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Skills", margin, y);
      y += lineHeight;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(skills, margin, y);
    }

    const blob = doc.output("blob");
    downloadBlob(blob, `${(name || "resume").replace(/\s+/g, "-").toLowerCase()}.pdf`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Contact</h3>
        <ToolInput label="Full Name" value={name} onChange={setName} />
        <ToolInput label="Email" value={email} onChange={setEmail} />
        <ToolInput label="Phone" value={phone} onChange={setPhone} />
        <ToolInput label="Location" value={location} onChange={setLocation} />
        <ToolInput label="Website / LinkedIn" value={website} onChange={setWebsite} />

        <ToolTextarea label="Professional Summary" value={summary} onChange={setSummary} rows={4} />

        <h3 className="font-medium text-gray-900">Experience</h3>
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="space-y-2 rounded-lg border border-gray-200 p-3">
            <ToolInput label="Job Title" value={exp.title} onChange={(v) => {
              setExperiences((e) => e.map((x, i) => i === idx ? { ...x, title: v } : x));
            }} />
            <ToolInput label="Company" value={exp.company} onChange={(v) => {
              setExperiences((e) => e.map((x, i) => i === idx ? { ...x, company: v } : x));
            }} />
            <ToolInput label="Dates" value={exp.dates} onChange={(v) => {
              setExperiences((e) => e.map((x, i) => i === idx ? { ...x, dates: v } : x));
            }} />
            <ToolTextarea label="Description" value={exp.description} onChange={(v) => {
              setExperiences((e) => e.map((x, i) => i === idx ? { ...x, description: v } : x));
            }} rows={3} />
          </div>
        ))}
        <button type="button" onClick={addExperience} className="text-sm font-medium text-accent">+ Add experience</button>

        <h3 className="font-medium text-gray-900">Education</h3>
        {education.map((edu, idx) => (
          <div key={edu.id} className="space-y-2 rounded-lg border border-gray-200 p-3">
            <ToolInput label="Degree" value={edu.degree} onChange={(v) => {
              setEducation((e) => e.map((x, i) => i === idx ? { ...x, degree: v } : x));
            }} />
            <ToolInput label="School" value={edu.school} onChange={(v) => {
              setEducation((e) => e.map((x, i) => i === idx ? { ...x, school: v } : x));
            }} />
            <ToolInput label="Dates" value={edu.dates} onChange={(v) => {
              setEducation((e) => e.map((x, i) => i === idx ? { ...x, dates: v } : x));
            }} />
          </div>
        ))}
        <button type="button" onClick={addEducation} className="text-sm font-medium text-accent">+ Add education</button>

        <ToolTextarea label="Skills (comma-separated)" value={skills} onChange={setSkills} rows={2} />

        <ToolButton onClick={downloadPdf}>Download PDF</ToolButton>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-medium text-gray-500">Live Preview</h3>
        <div className="space-y-4 text-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{name || "Your Name"}</h2>
            <p className="text-gray-600">{[email, phone, location, website].filter(Boolean).join(" · ")}</p>
          </div>
          {summary && (
            <div>
              <h3 className="font-bold text-gray-900">Summary</h3>
              <p className="text-gray-700">{summary}</p>
            </div>
          )}
          {experiences.some((e) => e.company || e.title) && (
            <div>
              <h3 className="font-bold text-gray-900">Experience</h3>
              {experiences.filter((e) => e.company || e.title).map((exp) => (
                <div key={exp.id} className="mt-2">
                  <p className="font-semibold">{exp.title}{exp.company && ` — ${exp.company}`}</p>
                  {exp.dates && <p className="text-xs italic text-gray-500">{exp.dates}</p>}
                  {exp.description && <p className="text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {education.some((e) => e.school || e.degree) && (
            <div>
              <h3 className="font-bold text-gray-900">Education</h3>
              {education.filter((e) => e.school || e.degree).map((edu) => (
                <div key={edu.id} className="mt-2">
                  <p className="font-semibold">{edu.degree}{edu.school && ` — ${edu.school}`}</p>
                  {edu.dates && <p className="text-xs italic text-gray-500">{edu.dates}</p>}
                </div>
              ))}
            </div>
          )}
          {skills && (
            <div>
              <h3 className="font-bold text-gray-900">Skills</h3>
              <p className="text-gray-700">{skills}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
