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

  const handleExportJSON = () => {
    try {
      const config = {
        clientName: invoiceState.clientName,
        invoiceDate: invoiceState.invoiceDate,
        columns: invoiceState.columns,
        sections: invoiceState.sections,
        notes: invoiceState.notes
      }
      const dataStr = JSON.stringify(config, null, 2)
      const slug = clientName
        ? clientName.replace(/\s+/g, '-').toLowerCase()
        : 'invoice'
      
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
      const link = document.createElement('a')
      link.href = dataUri
      link.download = `invoice-${slug}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      alert('Error exporting configuration: ' + error.message)
    }
  }

  const handleImportJSON = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result)
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON format')
        }
        if (!parsed.sections || !parsed.columns) {
          throw new Error('Missing sections or columns data')
        }
        invoiceState.loadInvoiceData(parsed)
      } catch (error) {
        alert('Failed to parse invoice configuration: ' + error.message)
      }
    }
    reader.readAsText(file)
    // Reset file input so user can import the same file again if needed
    e.target.value = ''
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

      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
        <div className="download-group-title">Configuration Management</div>
        <div className="download-buttons-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <button
            className="download-btn-item json-btn"
            onClick={handleExportJSON}
            disabled={!isValid}
            title="Download configuration JSON to edit later"
          >
            💾 Export JSON
          </button>
          <label
            className="download-btn-item import-btn"
            title="Import configuration JSON to edit"
          >
            📂 Import JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

