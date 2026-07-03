/**
 * Format number to Indian rupee format with commas
 * @param {number} amount - The amount to format
 * @returns {string} Formatted amount (e.g., "1,23,456.50")
 */
export const formatIndianCurrency = (amount) => {
  if (!amount || isNaN(amount)) return '0.00'
  
  const num = parseFloat(amount).toFixed(2)
  const parts = num.split('.')
  const integerPart = parts[0]
  const decimalPart = parts[1]
  
  // Add Indian comma formatting
  const lastThree = integerPart.slice(-3)
  const otherDigits = integerPart.slice(0, -3)
  const formatted = otherDigits === '' 
    ? lastThree 
    : otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
  
  return formatted + '.' + decimalPart
}

/**
 * Calculate amount for a line item
 * @param {object} item - Line item object with area/unit and rate
 * @returns {number} Calculated amount
 */
export const calculateLineItemAmount = (item) => {
  const area = parseFloat(item.area) || 0
  const rate = parseFloat(item.rate) || 0
  return area * rate
}

/**
 * Calculate grand total across all sections
 * @param {array} sections - Array of section objects, each with lineItems array
 * @returns {number} Grand total amount
 */
export const calculateGrandTotal = (sections) => {
  if (!Array.isArray(sections)) return 0
  
  return sections.reduce((total, section) => {
    if (!Array.isArray(section.lineItems)) return total
    
    const sectionTotal = section.lineItems.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0)
    }, 0)
    
    return total + sectionTotal
  }, 0)
}

/**
 * Get all line items across all sections (flattened)
 * @param {array} sections - Array of section objects
 * @returns {array} Flattened array of all line items with section info
 */
export const getAllLineItems = (sections) => {
  if (!Array.isArray(sections)) return []
  
  return sections.flatMap(section => 
    (section.lineItems || []).map(item => ({
      ...item,
      sectionTitle: section.title
    }))
  )
}
