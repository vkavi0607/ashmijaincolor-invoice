/**
 * SectionEditor Component
 * Form to add/edit/remove a section and its line items
 */
export const SectionEditor = ({
  section,
  index,
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
          Delete
        </button>
      </div>

      <div className="line-items-container">
        {section.lineItems && section.lineItems.map((item, itemIndex) => (
          <div key={item.id} className="line-item-editor">
            <div className="line-item-number">#{itemIndex + 1}</div>
            
            <input
              type="text"
              className="line-item-input"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                onLineItemChange(section.id, item.id, {
                  description: e.target.value
                })
              }
            />
            
            <input
              type="number"
              className="line-item-input"
              placeholder="Area/Unit"
              value={item.area}
              onChange={(e) =>
                onLineItemChange(section.id, item.id, {
                  area: e.target.value
                })
              }
              step="0.01"
            />
            
            <input
              type="number"
              className="line-item-input"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) =>
                onLineItemChange(section.id, item.id, {
                  rate: e.target.value
                })
              }
              step="0.01"
            />
            
            <input
              type="number"
              className="line-item-amount-display"
              value={item.amount || 0}
              onChange={(e) =>
                onLineItemChange(section.id, item.id, {
                  amount: e.target.value
                })
              }
              placeholder="Amount"
              readOnly
              title="Auto-calculated from Area × Rate"
            />
            
            <button
              className="btn btn-danger btn-sm"
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
      >
        + Add Line Item
      </button>
    </div>
  )
}
