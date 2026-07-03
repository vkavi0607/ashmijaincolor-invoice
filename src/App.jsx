import { useInvoiceState } from './hooks/useInvoiceState'
import { InvoicePreview } from './components/InvoicePreview'
import { DownloadButton } from './components/DownloadButton'
import { SectionEditor } from './components/SectionEditor'

function App() {
  const invoiceState = useInvoiceState()

  return (
    <div className="app-container">
      {/* ====== LEFT PANEL: EDITOR ====== */}
      <div className="editor-panel">
        {/* Client Information */}
        <div className="client-form">
          <div className="client-form-title">Invoice Details</div>
          
          <div className="form-group">
            <label className="form-label">Client Name</label>
            <input
              type="text"
              className="form-input"
              value={invoiceState.clientName}
              onChange={(e) => invoiceState.setClientName(e.target.value)}
              placeholder="Enter client name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Invoice Date</label>
            <input
              type="date"
              className="form-input"
              value={invoiceState.invoiceDate}
              onChange={(e) => invoiceState.setInvoiceDate(e.target.value)}
            />
          </div>
        </div>

        {/* Sections and Line Items */}
        <div>
          <h3 style={{ 
            marginBottom: '16px', 
            color: '#333',
            fontSize: '16px',
            fontWeight: '600'
          }}>Services & Items</h3>
          
          {invoiceState.sections.map((section) => (
            <SectionEditor
              key={section.id}
              section={section}
              onTitleChange={invoiceState.updateSectionTitle}
              onAddLineItem={invoiceState.addLineItem}
              onLineItemChange={invoiceState.updateLineItem}
              onRemoveLineItem={invoiceState.removeLineItem}
              onRemoveSection={invoiceState.removeSection}
            />
          ))}

          <button
            className="btn btn-primary"
            onClick={invoiceState.addSection}
            style={{ marginBottom: '20px' }}
          >
            + Add Section
          </button>
        </div>

        {/* Notes */}
        <div className="client-form">
          <div className="client-form-title">Invoice Notes</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {invoiceState.notes.map((note, index) => (
              <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <textarea
                  className="form-textarea"
                  value={note}
                  onChange={(e) => invoiceState.updateNote(index, e.target.value)}
                  placeholder="Add a note"
                  style={{ flex: 1, minHeight: '60px' }}
                />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => invoiceState.removeNote(index)}
                  title="Remove note"
                  style={{ marginTop: '0' }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={invoiceState.addNote}
            style={{ marginTop: '12px' }}
          >
            + Add Note
          </button>
        </div>
      </div>

      {/* ====== RIGHT PANEL: PREVIEW & DOWNLOAD ====== */}
      <div className="preview-panel">
        <InvoicePreview
          clientName={invoiceState.clientName}
          invoiceDate={invoiceState.invoiceDate}
          sections={invoiceState.sections}
          notes={invoiceState.notes}
          grandTotal={invoiceState.grandTotal}
        />
        
        <div className="download-button-container">
          <DownloadButton
            clientName={invoiceState.clientName}
            isValid={invoiceState.isValid}
          />
        </div>
      </div>
    </div>
  )
}

export default App
