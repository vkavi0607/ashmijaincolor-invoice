import { formatIndianCurrency } from '../utils/calculateTotals'

/**
 * LineItemRow Component
 * Renders a single line item in the invoice table (display mode)
 */
export const LineItemRow = ({ item, index }) => {
  const amount = formatIndianCurrency(item.amount)
  
  return (
    <tr className="line-item-row">
      <td className="line-item-no">{index}</td>
      <td className="line-item-description">{item.description}</td>
      <td className="line-item-area">{item.area}</td>
      <td className="line-item-rate">₹ {formatIndianCurrency(item.rate)}</td>
      <td className="line-item-amount">₹ {amount}</td>
    </tr>
  )
}
