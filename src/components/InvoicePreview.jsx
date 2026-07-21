import { InvoiceHeader } from './InvoiceHeader'
import { SenderDetails } from './SenderDetails'
import { BillToSection } from './BillToSection'
import { InvoiceTable } from './InvoiceTable'
import { NotesSection } from './NotesSection'
import { InvoiceFooter } from './InvoiceFooter'

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
  grandTotal,
  columns
}) => {
  return (
    <div id="invoice-preview" className="invoice-container">
      <InvoiceHeader invoiceDate={invoiceDate} />
      <SenderDetails />
      <BillToSection clientName={clientName} />
      <InvoiceTable sections={sections} grandTotal={grandTotal} columns={columns} />
      <NotesSection notes={notes} />
      <InvoiceFooter />
    </div>
  )
}


