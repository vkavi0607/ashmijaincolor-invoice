import { useState } from 'react'
import { exportInvoiceToPDF, exportInvoiceToJPEG, exportInvoiceToJPG } from '../utils/exportPdf'

/**
 * DownloadButton Component
 * Triggers PDF, JPEG, or JPG export of the invoice preview
 */
export const DownloadButton = ({ clientName, isValid, invoiceState }) => {
  const [isExporting, setIsExporting] = useState(false)

  const handleDownload = async (format) => {
    if (!isValid) {
      alert('Please add a client name and at least one line item before downloading.')
      return
    }

    setIsExporting(true)
    try {
      const slug = clientName
        ? clientName.replace(/\s+/g, '-').toLowerCase()
        : 'invoice'
      const filename = `invoice-${slug}.${format}`

      if (format === 'pdf') {
        await exportInvoiceToPDF('invoice-preview', filename)
      } else if (format === 'jpeg') {
        await exportInvoiceToJPEG('invoice-preview', filename)
      } else if (format === 'jpg') {
        await exportInvoiceToJPG('invoice-preview', filename)
      }
    } catch (error) {
      alert(`Error generating ${format.toUpperCase()}: ` + error.message)
    } finally {
      setIsExporting(false)
    }
  }


  return (
    <div className="download-group-container">
      <div className="download-group-title">Export Invoice (Max 5MB)</div>
      <div className="download-buttons-row">
        <button
          className="download-btn-item pdf-btn"
          onClick={() => handleDownload('pdf')}
          disabled={!isValid || isExporting}
          title="Download as PDF"
        >
          📄 PDF
        </button>
        <button
          className="download-btn-item jpeg-btn"
          onClick={() => handleDownload('jpeg')}
          disabled={!isValid || isExporting}
          title="Download as JPEG"
        >
          🖼️ JPEG
        </button>
        <button
          className="download-btn-item jpg-btn"
          onClick={() => handleDownload('jpg')}
          disabled={!isValid || isExporting}
          title="Download as JPG"
        >
          🖼️ JPG
        </button>
      </div>

    </div>
  )
}

