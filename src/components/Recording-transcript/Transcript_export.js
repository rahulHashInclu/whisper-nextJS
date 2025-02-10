// utils/transcriptExport.js
import { Document, Paragraph, Packer, TextRun, HeadingLevel, AlignmentType, convertInchesToTwip } from 'docx';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export const downloadTranscript = async (transcriptionContent) => {
  try {
    if (!transcriptionContent?.result || transcriptionContent.result.length === 0) {
      throw new Error('No transcription data available');
    }

    const sections = [];
    
    // Title
    sections.push(
      new Paragraph({
        text: "Meeting Transcript",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      })
    );

    // Add timestamp for the transcript
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
            italics: true
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      })
    );

    // Add each conversation segment
    transcriptionContent.result.forEach((segment, index) => {
      const elapsedTime = formatTime(index === 0 ? 0 : segment.start_time);
      
      // Speaker and timestamp
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: segment.speaker,
              bold: true
            }),
            new TextRun({
              text: ` (${elapsedTime})`,
              color: "666666"
            })
          ],
          spacing: { before: 200, after: 100 }
        })
      );

      // Conversation text
      sections.push(
        new Paragraph({
          text: segment.translated_text,
          indent: { left: convertInchesToTwip(0.5) },
          spacing: { after: 200 }
        })
      );
    });

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
    
    // Generate filename with current date and time
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    link.download = `transcript-${dateStr}-${timeStr}.docx`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error generating transcript DOCX:', error);
    throw new Error('Failed to generate transcript document');
  }
};