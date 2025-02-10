
// utils/meetingMinutesExport.js
import { Document, Paragraph, Packer, TextRun, HeadingLevel, AlignmentType, convertInchesToTwip } from 'docx';

export const downloadMeetingMinutes = async (minutesData) => {
  try {
    const sections = [];
    
    // Title
    sections.push(
      new Paragraph({
        text: "Meeting Minutes",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      })
    );

    // Attendees Section
    sections.push(
      new Paragraph({
        text: "Attendees",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );
    
    if (minutesData?.attendees?.length > 0) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: minutesData.attendees.join(", "),
            })
          ],
          spacing: { after: 200 }
        })
      );
    }

    // Key Events Section
    sections.push(
      new Paragraph({
        text: "Key Events",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );
    
    if (minutesData?.key_events?.length > 0) {
      minutesData.key_events.forEach(event => {
        sections.push(
          new Paragraph({
            text: `• ${event}`,
            indent: { left: convertInchesToTwip(0.5) },
            spacing: { after: 100 }
          })
        );
      });
    } else {
      sections.push(
        new Paragraph({
          text: "No Key Events",
          spacing: { after: 200 }
        })
      );
    }

    // Meeting Introduction
    sections.push(
      new Paragraph({
        text: "Meeting Introduction",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: minutesData?.starts_with || "No introduction available",
        spacing: { after: 200 }
      })
    );

    // Conclusions
    sections.push(
      new Paragraph({
        text: "Conclusions",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: minutesData?.conclusions || "No conclusions available",
        spacing: { after: 200 }
      })
    );

    // Next Actions
    sections.push(
      new Paragraph({
        text: "Next Actions",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );
    
    if (minutesData?.next_actions?.length > 0) {
      minutesData.next_actions.forEach(action => {
        sections.push(
          new Paragraph({
            text: `• ${action}`,
            indent: { left: convertInchesToTwip(0.5) },
            spacing: { after: 100 }
          })
        );
      });
    } else {
      sections.push(
        new Paragraph({
          text: "No Next Actions",
          spacing: { after: 200 }
        })
      );
    }

    // Promises Given
    sections.push(
      new Paragraph({
        text: "Promises Given",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );
    
    if (minutesData?.promises_given?.length > 0) {
      minutesData.promises_given.forEach(promise => {
        sections.push(
          new Paragraph({
            text: `• ${promise}`,
            indent: { left: convertInchesToTwip(0.5) },
            spacing: { after: 100 }
          })
        );
      });
    } else {
      sections.push(
        new Paragraph({
          text: "No promises given",
          spacing: { after: 200 }
        })
      );
    }

    // Summary
    sections.push(
      new Paragraph({
        text: "Summary",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );
    
    sections.push(
      new Paragraph({
        text: minutesData?.summary || "No Summary available",
        spacing: { after: 200 }
      })
    );

    // Create document
    const doc = new Document({
      sections: [{
        properties: {},
        children: sections
      }]
    });

    // Generate and download
    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meeting-minutes-${new Date().toISOString().split('T')[0]}.docx`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw new Error('Failed to generate document');
  }
};
