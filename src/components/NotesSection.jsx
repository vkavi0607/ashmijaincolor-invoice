/**
 * NotesSection Component
 * Displays invoice notes and terms & conditions professionally
 */
export const NotesSection = ({ notes }) => {
  // Filter out empty notes
  const activeNotes = notes ? notes.filter(n => n.trim() !== '') : []

  if (activeNotes.length === 0) return null

  return (
    <div className="notes-section">
      <div className="notes-title">Notes:</div>
      <div className="notes-grid">
        {activeNotes.map((note, index) => (
          <div key={index} className="notes-item">
            <span className="notes-number">{(index + 1).toString().padStart(2, '0')}</span>
            <span className="notes-text">{note}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

