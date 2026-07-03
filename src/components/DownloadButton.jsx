import { exportInvoiceToPDF } from '../utils/exportPdf'

/**
 * DownloadButton Component
 * Triggers PDF export of the invoice preview
 */
export const DownloadButton = ({ clientName, isValid }) => {
  const handleDownload = async () => {
    if (!isValid) {
      alert('Please add a client name and at least one line item before downloading.')
      return
    }

    try {
      const filename = clientName
        ? `invoice-${clientName.replace(/\s+/g, '-').toLowerCase()}.pdf`
        : 'invoice.pdf'
      
      await exportInvoiceToPDF('invoice-preview', filename)
    } catch (error) {
      alert('Error generating PDF: ' + error.message)
    }
  }

  return (
    <button
      className="download-button"
      onClick={handleDownload}
      disabled={!isValid}
      title={!isValid ? 'Add client name and line items to enable download' : 'Download invoice as PDF'}
    >
      📥 Download as PDF
    </button>
  )
}
