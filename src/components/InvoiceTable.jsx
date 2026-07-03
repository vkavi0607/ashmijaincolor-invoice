import { LineItemRow } from './LineItemRow'
import { formatIndianCurrency } from '../utils/calculateTotals'

/**
 * InvoiceTable Component
 * Renders the complete invoice table with all sections and line items
 */
export const InvoiceTable = ({ sections, grandTotal }) => {
  let itemCounter = 1

  return (
    <table className="invoice-table">
      <thead className="table-header">
        <tr>
          <th style={{ width: '40px' }}>No.</th>
          <th style={{ flex: 1 }}>Description</th>
          <th style={{ width: '100px' }}>Area/Unit</th>
          <th style={{ width: '100px' }}>Rate</th>
          <th style={{ width: '100px' }}>Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        {sections.map((section) => (
          <tbody key={section.id}>
            {/* Section Header Row */}
            {section.lineItems && section.lineItems.length > 0 && (
              <tr className="section-header-row">
                <td colSpan="5">{section.title}:</td>
              </tr>
            )}

            {/* Line Items */}
            {section.lineItems && section.lineItems.map((item) => (
              <LineItemRow
                key={item.id}
                item={item}
                index={itemCounter++}
              />
            ))}
          </tbody>
        ))}

        {/* Grand Total Row */}
        <tr className="grand-total-row">
          <td colSpan="4" className="grand-total-label">
            GRAND TOTAL
          </td>
          <td>
            ₹ {formatIndianCurrency(grandTotal)}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
