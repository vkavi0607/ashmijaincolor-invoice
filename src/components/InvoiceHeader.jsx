/**
 * InvoiceHeader Component
 * Displays company name, tagline, invoice label, and date
 */
export const InvoiceHeader = ({ invoiceDate }) => {
  const formattedDate = new Date(invoiceDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="invoice-header">
      <div className="header-left">
        <div className="company-name">ASHMIJA</div>
        <div className="company-tagline">— IN COLOUR —</div>
      </div>
      <div className="header-right">
        <div className="invoice-label">INVOICE</div>
        <div className="invoice-date">{formattedDate}</div>
      </div>
    </div>
  )
}
