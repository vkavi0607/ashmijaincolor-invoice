import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const MAX_EXPORT_BYTES = 5 * 1024 * 1024
const PDF_IMAGE_MAX_BYTES = 4.6 * 1024 * 1024

const getDataUrlSizeBytes = (dataUrl) => {
  const [, base64] = dataUrl.split(',')
  return Math.ceil((base64.length * 3) / 4)
}

const downloadDataUrl = (dataUrl, filename) => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const createInvoiceCanvas = async (elementId) => {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`)
  }

  return await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  })
}

const createCompressedDataUrl = (canvas, mimeType = 'image/jpeg', maxBytes = MAX_EXPORT_BYTES) => {
  let quality = 0.95
  let bestDataUrl = canvas.toDataURL(mimeType, quality)

  while (quality >= 0.45) {
    const dataUrl = canvas.toDataURL(mimeType, quality)
    if (getDataUrlSizeBytes(dataUrl) <= maxBytes) {
      return dataUrl
    }
    bestDataUrl = dataUrl
    quality -= 0.05
  }

  return bestDataUrl
}

export const exportInvoiceToJPEG = async (elementId, filename = 'invoice.jpeg') => {
  try {
    const canvas = await createInvoiceCanvas(elementId)
    const dataUrl = createCompressedDataUrl(canvas, 'image/jpeg', MAX_EXPORT_BYTES)
    downloadDataUrl(dataUrl, filename)
  } catch (error) {
    console.error('Error exporting JPEG:', error)
    throw error
  }
}

export const exportInvoiceToJPG = async (elementId, filename = 'invoice.jpg') => {
  return exportInvoiceToJPEG(elementId, filename)
}

export const exportInvoiceToPDF = async (elementId, filename = 'invoice.pdf') => {
  try {
    const canvas = await createInvoiceCanvas(elementId)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth - 10
    let imgHeight = (canvas.height * imgWidth) / canvas.width
    if (imgHeight > pdfHeight - 10) {
      imgHeight = pdfHeight - 10
    }

    let dataUrl = createCompressedDataUrl(canvas, 'image/jpeg', PDF_IMAGE_MAX_BYTES)
    pdf.addImage(dataUrl, 'JPEG', 5, 5, imgWidth, imgHeight)

    const pdfBlob = pdf.output('blob')
    if (pdfBlob.size > MAX_EXPORT_BYTES) {
      dataUrl = createCompressedDataUrl(canvas, 'image/jpeg', PDF_IMAGE_MAX_BYTES * 0.9)
      pdf.deletePage(1)
      pdf.addPage()
      pdf.addImage(dataUrl, 'JPEG', 5, 5, imgWidth, imgHeight)
    }

    pdf.save(filename)
  } catch (error) {
    console.error('Error exporting PDF:', error)
    throw error
  }
}
