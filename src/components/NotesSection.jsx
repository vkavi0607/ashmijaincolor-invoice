/**
 * NotesSection Component
 * Displays invoice notes as bullet points
 */
export const NotesSection = ({ notes }) => {
  if (!notes || notes.length === 0) return null

  return (
    <div className="notes-section">
      <div className="notes-title">Note:</div>
      <ul className="notes-list">
        {notes.map((note, index) => (
          <li key={index} className="notes-item">
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}
