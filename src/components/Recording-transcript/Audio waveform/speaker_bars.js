'use client';

// const SpeakerTimeline = ({ 
//     duration = 100, // total duration in seconds
//     speakerSegments = [
//       // Sample data for speaker 1
//       { start: 0, end: 15 },
//       { start: 30, end: 45 },
//       { start: 60, end: 85 }
//     ],
//     speakerTwoSegments = [
//       // Sample data for speaker 2
//       { start: 20, end: 35 },
//       { start: 50, end: 65 },
//       { start: 90, end: 100 }
//     ]
//   }) => {
//     const containerStyle = "w-full w-full flex-col items-center justify-between gap-4 px-2 rounded-lg";
//     const timelineStyle = "w-full h-4 bg-gray-700 rounded-full mb-4 overflow-hidden";
    
//     const renderSegments = (segments, color) => {
//       return segments.map((segment, index) => {
//         const leftPosition = (segment.start / duration) * 100;
//         const width = ((segment.end - segment.start) / duration) * 100;
        
//         return (
//           <div
//             key={index}
//             className={`absolute h-full ${color}`}
//             style={{
//               left: `${leftPosition}%`,
//               width: `${width}%`
//             }}
//           />
//         );
//       });
//     };
  
//     return (
//       <div className={containerStyle}>
//         {/* First speaker timeline */}
//         <div className={timelineStyle + " relative"}>
//           {renderSegments(speakerSegments, "bg-rose-500")}
//         </div>
        
//         {/* Second speaker timeline */}
//         <div className={timelineStyle + " relative"}>
//           {renderSegments(speakerTwoSegments, "bg-violet-500")}
//         </div>
//       </div>
//     );
//   };
  
//   export default SpeakerTimeline;


const DynamicSpeakerTimeline = ({segments, numSpeakers, totalDuration}) => {


    console.log('segments from dynamic', segments);
    console.log('numSpeakers from dynamic', numSpeakers);
    console.log('totalDuration from dynamic', totalDuration); 
  // Colors for different speakers
  const speakerColors = [
    'bg-rose-500',    // Speaker 0
    'bg-violet-500',  // Speaker 1
    'bg-blue-500',    // Speaker 2
    'bg-green-500',   // Speaker 3 (if needed)
    'bg-yellow-500'   // Speaker 4 (if needed)
  ];

  // Group segments by speaker
  const groupedSegments = {};
  for (let i = 0; i < numSpeakers; i++) {
    groupedSegments[`speaker_${i}`] = segments.filter(
      segment => segment.speaker === `speaker_${i}`
    ).map(segment => ({
      start: segment.start_time,
      end: segment.end_time
    }));
  }

  const containerStyle = "w-full space-y-4";
  const timelineStyle = "w-full h-4 bg-gray-700 rounded-full relative overflow-hidden";

  const renderSpeakerTimeline = (speakerId, colorClass) => {
    const speakerSegments = groupedSegments[speakerId] || [];
    
    return (
      <div key={speakerId} className={timelineStyle}>
        {speakerSegments.map((segment, index) => {
          const leftPosition = (segment.start / totalDuration) * 100;
          const width = ((segment.end - segment.start) / totalDuration) * 100;
          
          return (
            <div
              key={`${speakerId}-${index}`}
              className={`absolute h-full ${colorClass}`}
              style={{
                left: `${leftPosition}%`,
                width: `${width}%`
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={containerStyle}>
      {Array.from({ length: numSpeakers }, (_, i) => (
        renderSpeakerTimeline(`speaker_${i}`, speakerColors[i])
      ))}
    </div>
  );
};

export default DynamicSpeakerTimeline;