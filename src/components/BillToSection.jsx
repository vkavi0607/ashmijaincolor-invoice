/**
 * BillToSection Component
 * Displays client name/billing information
 */
export const BillToSection = ({ clientName }) => {
  return (
    <div className="bill-to-section">
      <div className="bill-to-label">Client:</div>
      <div className="bill-to-name">{clientName || 'Client Name'}</div>
    </div>
  )
}
