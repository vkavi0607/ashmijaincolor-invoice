# Ashmija in Colour - Invoice Generator

A professional, web-based invoice generator for Ashmija in Colour (mural/wall art studio). Built with React, Vite, and modern web technologies for creating, editing, and exporting beautiful invoices as PDF.

## Features

- ✨ **Live Preview**: Real-time invoice preview as you edit
- 📝 **Dynamic Sections**: Add/remove service sections and line items
- 🧮 **Auto-Calculation**: Automatic amount calculation and Indian rupee formatting
- 📄 **PDF Export**: Export invoice as A4-sized, print-ready PDF
- 🎨 **Professional Design**: Pre-designed invoice template matching Ashmija's branding
- 📱 **Fully Responsive**: Works on mobile (320px+), tablet, laptop, and ultra-wide displays (2560px+)
  - **Desktop (1200px+)**: Split-panel editor and preview side-by-side
  - **Tablet (768px-1200px)**: Stacked editor and preview with optimized spacing
  - **Mobile (480px-768px)**: Single-column layout, touch-friendly buttons (min 44px height)
  - **Small Mobile (<480px)**: Compact layout with horizontal scroll for tables
  - **Landscape Orientation**: Optimized for landscape on mobile/tablet
  - **Large Screens (1920px+)**: Expanded layout with larger fonts and spacing
  - **Ultra-Wide (2560px+)**: Enhanced experience with maximum readability
- 📋 **Mobile Optimizations**: 
  - Touch-friendly form inputs (min 12px padding on mobile)
  - Responsive table with horizontal scroll on small screens
  - Collapsible line item editor on mobile (single column)
  - Sticky download button for easy access
- ✅ **Validation**: Basic form validation before PDF export

## Project Structure

```
.
├── index.html                 # HTML entry point
├── vite.config.js            # Vite configuration
├── package.json              # Project dependencies
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Main app component
│   ├── components/
│   │   ├── InvoiceHeader.jsx        # Company branding and invoice label
│   │   ├── SenderDetails.jsx        # Contact information display
│   │   ├── BillToSection.jsx        # Client name section
│   │   ├── InvoiceTable.jsx         # Main invoice table (all sections + items)
│   │   ├── LineItemRow.jsx          # Single line item display
│   │   ├── SectionEditor.jsx        # Editor form for sections and items
│   │   ├── NotesSection.jsx         # Invoice notes display
│   │   ├── InvoicePreview.jsx       # Complete invoice card (exported to PDF)
│   │   └── DownloadButton.jsx       # PDF download trigger
│   ├── hooks/
│   │   └── useInvoiceState.js       # Central state management hook
│   ├── utils/
│   │   ├── calculateTotals.js       # Calculations and Indian currency formatting
│   │   └── exportPdf.js             # PDF export logic (html2canvas + jsPDF)
│   └── styles/
│       └── invoice.css              # All styling (design tokens, layout, print styles)
└── README.md                  # This file
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm

### Steps

1. **Navigate to project directory**
   ```bash
   cd invoice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm build
   ```

## How to Use

### Editing Invoices

1. **Enter Client Details**
   - Fill in client name and invoice date in the left panel
   
2. **Add/Edit Services**
   - Click **+ Add Section** to create a new service category (e.g., "Interior Wall Art Works")
   - For each section, click **+ Add Line Item** to add individual services
   - Fill in:
     - **Description**: Service/item description
     - **Area/Unit**: Quantity or area (e.g., 150 sq.ft.)
     - **Rate**: Price per unit (e.g., ₹100)
     - **Amount**: Auto-calculated from Area × Rate, or manually override

3. **Customize Notes**
   - Edit default notes or add your own
   - Default notes cover typical terms for wall art projects

4. **Live Preview**
   - The right panel shows real-time preview of the invoice
   - All changes reflect instantly

### Exporting to PDF

1. **Verify Details**
   - Ensure client name and at least one line item are filled
   
2. **Download PDF**
   - Click **📥 Download as PDF** button
   - PDF exports as A4 size, ready for printing
   - File is named: `invoice-{client-name}.pdf`

## Design Details

### Color Scheme
- **Primary Dark Red**: `#8B1E1E` (company branding)
- **Text Grey**: `#666`
- **Section Background**: `#f5f5f5`
- **Total Row Background**: `#f0f0f0`

### Typography
- **Heading**: Georgia serif font (for company name and invoice label)
- **Body**: System sans-serif font

### Invoice Sections
1. **Header**: Company name (ASHMIJA), tagline (— IN COLOUR —), invoice label, date
2. **Sender Details**: Contact information
3. **Bill To**: Client name
4. **Line Items Table**: Service sections with line items, amounts, and grand total
5. **Notes**: Bullet-point terms and conditions

## Responsive Design

The invoice generator is fully responsive across all device sizes with intelligent layout adjustments.

### Breakpoints

| Breakpoint | Devices | Layout | Key Features |
|-----------|---------|--------|--------------|
| **Desktop (1200px+)** | Desktop, laptop | Split 2-column (editor left, preview right) | Full spacing, standard font sizes |
| **Tablet (768px-1200px)** | iPad, large tablets | Single column, stacked panels | Reduced padding, optimized spacing |
| **Mobile (480px-768px)** | Standard phones | Single column, compact layout | Touch-friendly inputs, scroll table |
| **Small Mobile (<480px)** | Small phones, old devices | Minimal layout, horizontal scroll | Compact editor, collapsible sections |
| **Landscape (<768px)** | Phone/tablet landscape | Optimized for horizontal space | Adjusted heights for viewport |
| **Large Screens (1920px+)** | 4K monitors | Expanded layout | Larger fonts, generous spacing |
| **Ultra-Wide (2560px+)** | 5K+ displays | Maximum comfort | Premium experience with extra space |

### Mobile Optimizations

- **Touch-Friendly**: All buttons and inputs meet 44px minimum touch target (mobile)
- **Responsive Table**: Automatically scrolls horizontally on small screens
- **Smart Inputs**: Font size 14px+ on mobile to prevent auto-zoom
- **Collapsible Editor**: Line item editor collapses to single column on mobile
- **Sticky Download**: Download button remains accessible while scrolling
- **Font Scaling**: Fonts reduce gradually across breakpoints for readability
- **Landscape Support**: Special handling for landscape orientation on mobile/tablet
- **Safe Areas**: Respects notch/safe-area insets on modern devices

### CSS Media Query Strategy

```css
/* Mobile-first approach */
/* Base styles (mobile: <480px) */
/* Then scale up: 480px → 768px → 1200px → 1920px → 2560px+ */
```

All responsive adjustments maintain:
- Consistent branding and design
- Readable font sizes at all scales
- Touch-friendly interactive elements
- Print-optimized PDF export regardless of screen size

## Technical Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **PDF Generation**: html2canvas + jsPDF
- **State Management**: React Hooks (useInvoiceState)
- **Styling**: CSS (no external framework)
- **Formatting**: Indian rupee number format with commas

## Key Components

### useInvoiceState Hook
Central state management hook that handles:
- Client information (name, invoice date)
- Sections and line items CRUD operations
- Automatic amount calculations
- Notes management
- Grand total calculation
- Invoice validation

### exportPdf Function
Exports the invoice preview as a professional A4 PDF:
- Uses html2canvas to render component to image
- Uses jsPDF to create PDF with A4 dimensions
- Maintains print quality (2x DPI scaling)
- Handles responsive sizing

### calculateTotals Utilities
- `formatIndianCurrency`: Converts amounts to Indian comma format (1,23,456.50)
- `calculateLineItemAmount`: Calculates line item amount (area × rate)
- `calculateGrandTotal`: Sums all line items across sections

## Customization

### Changing Company Details
Edit [src/components/SenderDetails.jsx](src/components/SenderDetails.jsx) to update:
- Company name
- Address
- Phone
- Email

### Changing Design Colors
Edit CSS variables in [src/styles/invoice.css](src/styles/invoice.css):
- `--primary-dark-red`: Company color
- `--section-bg`: Section header background
- Other theme colors

### Changing Default Notes
Edit `DEFAULT_NOTES` array in [src/hooks/useInvoiceState.js](src/hooks/useInvoiceState.js)

### Changing Invoice Template
Modify components in `src/components/` to adjust layout, sections, or fields

## Troubleshooting

### PDF not downloading
- Check browser console for errors
- Ensure client name and at least one line item are added
- Try a different browser if issue persists

### PDF looks different from preview
- Make sure window is zoomed to 100%
- Check print margins in browser settings
- Some fonts may render differently; this is normal

### Calculations not updating
- Refresh the page if state seems stuck
- Check console for any JavaScript errors

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser supporting ES6 and CSS Grid

## Future Enhancements

- Invoice history/templates
- Multiple currency support
- Client database
- Email integration
- Invoice numbering system
- Tax calculations
- Multi-page invoices

## License

© 2024 Ashmija in Colour. All rights reserved.

## Support

For issues or feature requests, please contact: contact@ashmijaincolour.com
