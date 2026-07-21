import { useState, useCallback, useEffect } from 'react'
import { calculateGrandTotal } from '../utils/calculateTotals'

const DEFAULT_NOTES = [
  'The above quotation is prepared at a very reasonable base price.',
  'Material cost is included in the package.',
  'Piece charge items are billed as a fixed lump sum per piece.',
  'Pricing covers designing, sketching, coloring, detailing, and finishing work.',
  'Any additional work will be charged extra.'
]

const DEFAULT_COLUMNS = [
  { id: 'description', label: 'Description', type: 'text', deletable: false },
  { id: 'quantity', label: 'Quantity / Area', type: 'number', deletable: true },
  { id: 'rate', label: 'Rate', type: 'number', deletable: true },
  { id: 'amount', label: 'Amount', type: 'number', deletable: false, isCalculated: true, formula: { multiplier: 'quantity', multiplicand: 'rate' } }
]

/**
 * Custom hook for managing invoice state
 * Handles client info, sections, line items, notes, and dynamic columns
 */
export const useInvoiceState = () => {
  const [clientName, setClientName] = useState('Client Name')
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [columns, setColumns] = useState(DEFAULT_COLUMNS)
  
  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Interior Wall Art Works',
      lineItems: [
        {
          id: 1,
          description: 'Feature wall mural - Main bedroom',
          quantity: 150,
          rate: 100,
          amount: 15000
        }
      ]
    }
  ])
  const [notes, setNotes] = useState(DEFAULT_NOTES)

  // Recalculate amounts of all items if columns change (e.g., if a column is added/deleted or formula changes)
  const recalculateAllAmounts = useCallback((currentColumns, currentSections) => {
    const amountCol = currentColumns.find(c => c.isCalculated)
    if (!amountCol) return currentSections

    const { multiplier, multiplicand } = amountCol.formula || {}
    const hasMultiplier = currentColumns.some(c => c.id === multiplier)
    const hasMultiplicand = currentColumns.some(c => c.id === multiplicand)

    return currentSections.map(section => ({
      ...section,
      lineItems: (section.lineItems || []).map(item => {
        let amount = item.amount
        if (hasMultiplier && hasMultiplicand) {
          const val1 = parseFloat(item[multiplier]) || 0
          const val2 = parseFloat(item[multiplicand]) || 0
          amount = val1 * val2
        }
        return { ...item, amount }
      })
    }))
  }, [])

  // Column operations
  const addColumn = useCallback((label, type = 'text') => {
    const newId = `col_${Date.now()}`
    setColumns(prev => {
      const updated = [...prev]
      // Insert before the last item (Amount)
      const amountIndex = updated.findIndex(c => c.id === 'amount')
      if (amountIndex !== -1) {
        updated.splice(amountIndex, 0, { id: newId, label, type, deletable: true })
      } else {
        updated.push({ id: newId, label, type, deletable: true })
      }
      return updated
    })
  }, [])

  const deleteColumn = useCallback((columnId) => {
    setColumns(prev => {
      const updated = prev.filter(c => c.id !== columnId)
      // If deleted column was part of formula, we should adjust the formula if possible
      const amountCol = updated.find(c => c.id === 'amount')
      if (amountCol && amountCol.formula) {
        const { multiplier, multiplicand } = amountCol.formula
        if (multiplier === columnId || multiplicand === columnId) {
          // Find first two number columns left to use for formula, or disable formula
          const numCols = updated.filter(c => c.type === 'number' && c.id !== 'amount')
          if (numCols.length >= 2) {
            amountCol.formula = { multiplier: numCols[0].id, multiplicand: numCols[1].id }
          } else {
            delete amountCol.formula
          }
        }
      }
      return updated
    })
  }, [])

  const updateColumnLabel = useCallback((columnId, newLabel) => {
    setColumns(prev => prev.map(c => c.id === columnId ? { ...c, label: newLabel } : c))
  }, [])

  const updateColumnFormula = useCallback((multiplierId, multiplicandId) => {
    setColumns(prev => prev.map(c => {
      if (c.id === 'amount') {
        return {
          ...c,
          formula: { multiplier: multiplierId, multiplicand: multiplicandId }
        }
      }
      return c
    }))
  }, [])

  // Trigger recalculation when columns schema changes
  useEffect(() => {
    setSections(prev => recalculateAllAmounts(columns, prev))
  }, [columns, recalculateAllAmounts])

  // Add a new section
  const addSection = useCallback(() => {
    const newId = Math.max(...sections.map(s => s.id), 0) + 1
    setSections([
      ...sections,
      {
        id: newId,
        title: 'New Section',
        lineItems: []
      }
    ])
  }, [sections])

  // Update section title
  const updateSectionTitle = useCallback((sectionId, newTitle) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, title: newTitle }
        : section
    ))
  }, [sections])

  // Remove a section
  const removeSection = useCallback((sectionId) => {
    setSections(sections.filter(s => s.id !== sectionId))
  }, [sections])

  // Add line item to section
  const addLineItem = useCallback((sectionId) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newItemId = Math.max(...(section.lineItems?.map(i => i.id) || [0]), 0) + 1
        
        // Build new item based on active columns
        const newItem = { id: newItemId }
        columns.forEach(col => {
          if (col.id !== 'id') {
            newItem[col.id] = col.type === 'number' ? '' : ''
          }
        })
        newItem.amount = 0

        return {
          ...section,
          lineItems: [
            ...(section.lineItems || []),
            newItem
          ]
        }
      }
      return section
    }))
  }, [sections, columns])

  // Update line item in section
  const updateLineItem = useCallback((sectionId, itemId, updates) => {
    setSections(sections => sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lineItems: section.lineItems.map(item => {
            if (item.id === itemId) {
              const updated = { ...item, ...updates }
              
              // Calculate amount if formula is defined
              const amountCol = columns.find(c => c.isCalculated)
              if (amountCol && amountCol.formula) {
                const { multiplier, multiplicand } = amountCol.formula
                const hasMultiplier = columns.some(c => c.id === multiplier)
                const hasMultiplicand = columns.some(c => c.id === multiplicand)
                
                if (hasMultiplier && hasMultiplicand) {
                  const val1 = parseFloat(updated[multiplier]) || 0
                  const val2 = parseFloat(updated[multiplicand]) || 0
                  updated.amount = val1 * val2
                }
              }
              return updated
            }
            return item
          })
        }
      }
      return section
    }))
  }, [columns])

  // Remove line item from section
  const removeLineItem = useCallback((sectionId, itemId) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lineItems: section.lineItems.filter(item => item.id !== itemId)
        }
      }
      return section
    }))
  }, [sections])

  // Update or add a note
  const updateNote = useCallback((index, text) => {
    const newNotes = [...notes]
    newNotes[index] = text
    setNotes(newNotes)
  }, [notes])

  // Add a new note
  const addNote = useCallback(() => {
    setNotes([...notes, ''])
  }, [notes])

  // Remove a note
  const removeNote = useCallback((index) => {
    setNotes(notes.filter((_, i) => i !== index))
  }, [notes])

  // Calculate grand total
  const grandTotal = calculateGrandTotal(sections, columns)

  // Validate invoice
  const isValid = clientName.trim() !== '' && 
                  sections.some(s => s.lineItems && s.lineItems.length > 0)

  // Load imported invoice data
  const loadInvoiceData = useCallback((data) => {
    if (!data) return
    if (data.clientName !== undefined) setClientName(data.clientName)
    if (data.invoiceDate !== undefined) setInvoiceDate(data.invoiceDate)
    if (data.columns !== undefined) setColumns(data.columns)
    if (data.sections !== undefined) setSections(data.sections)
    if (data.notes !== undefined) setNotes(data.notes)
  }, [])

  return {
    // State
    clientName,
    invoiceDate,
    columns,
    sections,
    notes,
    grandTotal,
    isValid,
    
    // Setters
    setClientName,
    setInvoiceDate,
    
    // Column operations
    addColumn,
    deleteColumn,
    updateColumnLabel,
    updateColumnFormula,
    
    // Section operations
    addSection,
    updateSectionTitle,
    removeSection,
    
    // Line item operations
    addLineItem,
    updateLineItem,
    removeLineItem,
    
    // Note operations
    updateNote,
    addNote,
    removeNote,

    // Load data
    loadInvoiceData
  }
}

