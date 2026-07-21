/**
 * InvoiceHeader Component
 * Displays company name, tagline, invoice label, and date
 */
import logo from '../assets/logo.png'

export const InvoiceHeader = ({ invoiceDate }) => {
  const formattedDate = new Date(invoiceDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="invoice-header">
      <div className="header-left">
        <img src={logo} alt="Ashmija in Color Logo" className="header-logo" />
        <div className="header-branding">
          <div className="company-name">ASHMIJA</div>
          <div className="company-tagline">IN COLOR</div>
        </div>
      </div>
      <div className="header-right">
        <div className="invoice-label">INVOICE</div>
        <div className="invoice-date">{formattedDate}</div>
      </div>
    </div>
  )
}



