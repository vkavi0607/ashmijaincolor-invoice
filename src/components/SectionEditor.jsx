/**
 * SectionEditor Component
 * Form to add/edit/remove a section and its line items
 */
export const SectionEditor = ({
  section,
  columns,
  onTitleChange,
  onAddLineItem,
  onLineItemChange,
  onRemoveLineItem,
  onRemoveSection
}) => {
  return (
    <div className="section-editor">
      <div className="section-header-editor">
        <input
          type="text"
          className="section-title-input"
          value={section.title}
          onChange={(e) => onTitleChange(section.id, e.target.value)}
          placeholder="Section title (e.g., Interior Wall Art Works)"
        />
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemoveSection(section.id)}
          title="Remove section"
        >
          Delete Section
        </button>
      </div>

      <div className="line-items-container">
        {section.lineItems && section.lineItems.map((item, itemIndex) => (
          <div key={item.id} className="line-item-editor">
            <div className="line-item-number">#{itemIndex + 1}</div>

            <div className="line-item-fields">
              {columns.map((col) => {
                const isCalculated = col.isCalculated
                const isDescription = col.id === 'description'

                return (
                  <div key={col.id} className={`line-item-field-group col-${col.id}`}>
                    <label className="field-label-mobile">{col.label}</label>
                    <input
                      type={col.type === 'number' ? 'number' : 'text'}
                      className={isCalculated ? "line-item-amount-display" : "line-item-input"}
                      placeholder={col.label}
                      value={item[col.id] !== undefined ? item[col.id] : ''}
                      onChange={(e) =>
                        onLineItemChange(section.id, item.id, {
                          [col.id]: col.type === 'number' ? parseFloat(e.target.value) || '' : e.target.value
                        })
                      }
                      readOnly={isCalculated}
                      step={col.type === 'number' ? 'any' : undefined}
                      title={isCalculated ? "Auto-calculated field" : undefined}
                    />
                  </div>
                )
              })}
            </div>

            <button
              className="btn btn-danger btn-sm btn-delete-item"
              onClick={() => onRemoveLineItem(section.id, item.id)}
              title="Remove line item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        className="btn btn-secondary btn-sm"
        onClick={() => onAddLineItem(section.id)}
        style={{ marginTop: '10px' }}
      >
        + Add Line Item
      </button>
    </div>
  )
}

