import { InvoiceHeader } from './InvoiceHeader'
import { SenderDetails } from './SenderDetails'
import { BillToSection } from './BillToSection'
import { InvoiceTable } from './InvoiceTable'
import { NotesSection } from './NotesSection'

/**
 * InvoicePreview Component
 * Combines all invoice components into the final preview
 * This is the element that gets exported to PDF
 */
export const InvoicePreview = ({
  clientName,
  invoiceDate,
  sections,
  notes,
  grandTotal
}) => {
  return (
    <div id="invoice-preview" className="invoice-container">
      <InvoiceHeader invoiceDate={invoiceDate} />
      <SenderDetails />
      <BillToSection clientName={clientName} />
      <InvoiceTable sections={sections} grandTotal={grandTotal} />
      <NotesSection notes={notes} />
    </div>
  )
}
