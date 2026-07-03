import { useState, useCallback } from 'react'
import { calculateGrandTotal } from '../utils/calculateTotals'

const DEFAULT_NOTES = [
  'The above quotation is prepared at a very reasonable base price.',
  'Material cost is included in the package.',
  'Piece charge items are billed as a fixed lump sum per piece.',
  'Pricing covers designing, sketching, coloring, detailing, and finishing work.',
  'Any additional work will be charged extra.'
]

/**
 * Custom hook for managing invoice state
 * Handles client info, sections, line items, and notes
 */
export const useInvoiceState = () => {
  const [clientName, setClientName] = useState('Client Name')
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Interior Wall Art Works',
      lineItems: [
        {
          id: 1,
          description: 'Feature wall mural - Main bedroom',
          area: 150,
          rate: 100,
          amount: 15000
        }
      ]
    }
  ])
  const [notes, setNotes] = useState(DEFAULT_NOTES)

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
        return {
          ...section,
          lineItems: [
            ...(section.lineItems || []),
            {
              id: newItemId,
              description: '',
              area: '',
              rate: '',
              amount: 0
            }
          ]
        }
      }
      return section
    }))
  }, [sections])

  // Update line item in section
  const updateLineItem = useCallback((sectionId, itemId, updates) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lineItems: section.lineItems.map(item => {
            if (item.id === itemId) {
              const updated = { ...item, ...updates }
              // Auto-calculate amount if area and rate are provided
              if (updated.area && updated.rate && !updates.amount) {
                updated.amount = parseFloat(updated.area) * parseFloat(updated.rate)
              }
              return updated
            }
            return item
          })
        }
      }
      return section
    }))
  }, [sections])

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
  const grandTotal = calculateGrandTotal(sections)

  // Validate invoice (basic validation)
  const isValid = clientName.trim() !== '' && 
                  sections.some(s => s.lineItems && s.lineItems.length > 0)

  return {
    // State
    clientName,
    invoiceDate,
    sections,
    notes,
    grandTotal,
    isValid,
    
    // Setters
    setClientName,
    setInvoiceDate,
    
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
    removeNote
  }
}
