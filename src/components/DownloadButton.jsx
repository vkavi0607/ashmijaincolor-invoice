import { useState } from 'react'
import { exportInvoiceToPDF, exportInvoiceToJPEG, exportInvoiceToJPG } from '../utils/exportPdf'

/**
 * DownloadButton Component
 * Triggers PDF, JPEG, or JPG export of the invoice preview
 */
export const DownloadButton = ({ clientName, isValid, invoiceState }) => {
  const [isExporting, setIsExporting] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDownload = async (format) => {
    if (!isValid) {
      alert('Please add a client name and at least one line item before downloading.')
      return
    }

    setIsExporting(true)
    setIsDropdownOpen(false)
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
    <div className="top-action-bar">
      <div 
        className="export-dropdown-container"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <div className="export-trigger">
          Export
          <svg className="export-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {isDropdownOpen && (
          <div className="export-dropdown-menu">
            <div 
              className={`export-dropdown-item ${!isValid || isExporting ? 'disabled' : ''}`} 
              onClick={() => !(!isValid || isExporting) && handleDownload('pdf')}
            >
              PDF
            </div>
            <div 
              className={`export-dropdown-item ${!isValid || isExporting ? 'disabled' : ''}`} 
              onClick={() => !(!isValid || isExporting) && handleDownload('jpeg')}
            >
              JPEG
            </div>
            <div 
              className={`export-dropdown-item ${!isValid || isExporting ? 'disabled' : ''}`} 
              onClick={() => !(!isValid || isExporting) && handleDownload('jpg')}
            >
              JPG
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
