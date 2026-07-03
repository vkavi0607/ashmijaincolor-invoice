import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

/**
 * Export invoice preview as PDF
 * @param {string} elementId - ID of the element to export (typically "invoice-preview")
 * @param {string} filename - Name of the PDF file to download
 */
export const exportInvoiceToPDF = async (elementId, filename = 'invoice.pdf') => {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`)
    }

    // Convert element to canvas with high DPI for print quality
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })

    // A4 dimensions in mm (210 x 297)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const imgData = canvas.toDataURL('image/png')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    // Calculate dimensions to fit A4 while maintaining aspect ratio
    const imgWidth = pdfWidth - 10 // 5mm margins on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    // If image is too tall for one page, fit to page height
    let finalHeight = imgHeight
    if (finalHeight > pdfHeight - 10) {
      finalHeight = pdfHeight - 10
    }

    const yPosition = 5 // 5mm top margin
    pdf.addImage(imgData, 'PNG', 5, yPosition, imgWidth, finalHeight)

    // Download the PDF
    pdf.save(filename)
  } catch (error) {
    console.error('Error exporting PDF:', error)
    throw error
  }
}
