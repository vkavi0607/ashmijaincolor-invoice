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
        {/* Header Branding */}
        <div className="editor-brand-header">
          <div className="brand-logo-symbol">A</div>
          <div>
            <h1 className="brand-title">Ashmija in Color</h1>
            <p className="brand-subtitle">Invoice Billing Panel</p>
          </div>
        </div>

        {/* Client Information */}
        <div className="client-form">
          <div className="client-form-title">Invoice Details</div>
          
          <div className="form-group-row">
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
        </div>

        {/* Table Columns Customizer */}
        <div className="client-form columns-configurator">
          <div className="client-form-title">Table Columns Configuration</div>
          <p className="section-description">Customize fields for items in the invoice table. Re-label, add, or delete fields.</p>
          
          <div className="columns-list-container">
            {invoiceState.columns.map((col) => (
              <div key={col.id} className="column-config-row">
                <div className="col-info">
                  <input
                    type="text"
                    className="col-label-input-field"
                    value={col.label}
                    onChange={(e) => invoiceState.updateColumnLabel(col.id, e.target.value)}
                    placeholder="Column Label"
                  />
                  <span className={`col-type-badge ${col.type}`}>{col.type}</span>
                </div>
                
                <div className="col-actions">
                  {col.deletable ? (
                    <button
                      className="btn btn-icon btn-danger-icon"
                      onClick={() => invoiceState.deleteColumn(col.id)}
                      title="Remove Column"
                    >
                      ✕
                    </button>
                  ) : (
                    <span className="locked-badge" title="Required system column">Locked</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Column Area */}
          <div className="add-col-section">
            <div className="add-col-row">
              <input
                type="text"
                id="new-col-label"
                className="form-input"
                placeholder="New field (e.g. GST %, HSN)"
              />
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  const input = document.getElementById('new-col-label')
                  const val = input.value.trim()
                  if (val) {
                    invoiceState.addColumn(val, 'number')
                    input.value = ''
                  }
                }}
              >
                + Num Field
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  const input = document.getElementById('new-col-label')
                  const val = input.value.trim()
                  if (val) {
                    invoiceState.addColumn(val, 'text')
                    input.value = ''
                  }
                }}
              >
                + Text Field
              </button>
            </div>
          </div>

          {/* Formula Settings */}
          {invoiceState.columns.find(c => c.isCalculated)?.formula && (
            <div className="formula-config-block">
              <div className="formula-label">Amount Computation Formula:</div>
              <div className="formula-row">
                <select
                  className="formula-select"
                  value={invoiceState.columns.find(c => c.isCalculated)?.formula?.multiplier || ''}
                  onChange={(e) => {
                    const formula = invoiceState.columns.find(c => c.isCalculated)?.formula
                    invoiceState.updateColumnFormula(e.target.value, formula?.multiplicand)
                  }}
                >
                  {invoiceState.columns
                    .filter(c => c.type === 'number' && c.id !== 'amount')
                    .map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))
                  }
                </select>
                <span className="operator">×</span>
                <select
                  className="formula-select"
                  value={invoiceState.columns.find(c => c.isCalculated)?.formula?.multiplicand || ''}
                  onChange={(e) => {
                    const formula = invoiceState.columns.find(c => c.isCalculated)?.formula
                    invoiceState.updateColumnFormula(formula?.multiplier, e.target.value)
                  }}
                >
                  {invoiceState.columns
                    .filter(c => c.type === 'number' && c.id !== 'amount')
                    .map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))
                  }
                </select>
                <span className="result">= Amount</span>
              </div>
            </div>
          )}
        </div>

        {/* Sections and Line Items */}
        <div className="services-container">
          <div className="services-header">
            <h3 className="services-title">Services & Items</h3>
          </div>
          
          {invoiceState.sections.map((section) => (
            <SectionEditor
              key={section.id}
              section={section}
              columns={invoiceState.columns}
              onTitleChange={invoiceState.updateSectionTitle}
              onAddLineItem={invoiceState.addLineItem}
              onLineItemChange={invoiceState.updateLineItem}
              onRemoveLineItem={invoiceState.removeLineItem}
              onRemoveSection={invoiceState.removeSection}
            />
          ))}

          <button
            className="btn btn-primary btn-add-section"
            onClick={invoiceState.addSection}
          >
            + Add New Section
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
        <div className="download-button-container">
          <DownloadButton
            clientName={invoiceState.clientName}
            isValid={invoiceState.isValid}
            invoiceState={invoiceState}
          />
        </div>

        <InvoicePreview
          clientName={invoiceState.clientName}
          invoiceDate={invoiceState.invoiceDate}
          sections={invoiceState.sections}
          notes={invoiceState.notes}
          grandTotal={invoiceState.grandTotal}
          columns={invoiceState.columns}
        />
      </div>
    </div>
  )
}

export default App

