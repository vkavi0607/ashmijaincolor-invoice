import { formatIndianCurrency } from '../utils/calculateTotals'

/**
 * LineItemRow Component
 * Renders a single line item in the invoice table (display mode) dynamically
 */
export const LineItemRow = ({ item, index, columns }) => {
  return (
    <tr className="line-item-row">
      <td className="line-item-no">{index}</td>
      {columns && columns.map(col => {
        const val = item[col.id]

        // Format rate, amount, and custom currency columns
        const isCurrency = col.id === 'rate' || col.id === 'amount' ||
          col.id.toLowerCase().includes('price') ||
          col.id.toLowerCase().includes('total') ||
          col.id.toLowerCase().includes('amount')

        let displayVal = val !== undefined && val !== null ? val : ''
        if (col.type === 'number' && isCurrency) {
          displayVal = `₹ ${formatIndianCurrency(val)}`
        }

        return (
          <td key={col.id} className={`line-item-${col.id}`}>
            {displayVal}
          </td>
        )
      })}
    </tr>
  )
}

