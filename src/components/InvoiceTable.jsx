import React from 'react'
import { LineItemRow } from './LineItemRow'
import { formatIndianCurrency } from '../utils/calculateTotals'

/**
 * InvoiceTable Component
 * Renders the complete invoice table with all sections and line items dynamically
 */
export const InvoiceTable = ({ sections, grandTotal, columns }) => {
  let itemCounter = 1
  const totalCols = (columns ? columns.length : 4) + 1

  return (
    <table className="invoice-table">
      <thead className="table-header">
        <tr>
          <th style={{ width: '50px' }}>No.</th>
          {columns && columns.map(col => (
            <th key={col.id} className={`th-${col.id}`}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sections.map((section) => (
          <React.Fragment key={section.id}>
            {/* Section Header Row */}
            {section.lineItems && section.lineItems.length > 0 && (
              <tr className="section-header-row">
                <td colSpan={totalCols}>{section.title}:</td>
              </tr>
            )}

            {/* Line Items */}
            {section.lineItems && section.lineItems.map((item) => (
              <LineItemRow
                key={item.id}
                item={item}
                index={itemCounter++}
                columns={columns}
              />
            ))}
          </React.Fragment>
        ))}

        {/* Grand Total Row */}
        <tr className="grand-total-row">
          <td colSpan={totalCols - 1} className="grand-total-label">
            GRAND TOTAL
          </td>
          <td className="grand-total-amount">
            ₹ {formatIndianCurrency(grandTotal)}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

