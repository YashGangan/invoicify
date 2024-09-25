import { rgb } from 'pdf-lib';

export async function basic(page, { font, boldFont, data, logoImage, logoDims, qrImage, qrDims }) {
  const { width, height } = page.getSize();
  const darkGray = rgb(0.3, 0.3, 0.3);  
  const white = rgb(1, 1, 1);
  const black = rgb(0, 0, 0);


  // Header
  page.drawRectangle({
    x: 0,
    y: 800,
    width: 595,
    height: 42,
    color: rgb(0, 0, 0),
  });
  page.drawText('INVOICE', { x: 30, y: 815, size: 24, font: boldFont, color: white });
  page.drawText(`No.: ${data.invoiceNumber}`, { x: 420, y: 824, size: 10, font, color: white });
  page.drawText(`Date: ${data.invoiceDate}`, { x: 420, y: 810, size: 10, font , color: white});

  // Invoice Details
  page.drawText('INVOICE TO :', { x: 30, y: 750, size: 12, font: boldFont });
  page.drawText(data.customerName, { x: 30, y: 730, size: 14, font: boldFont });
  page.drawText(`${data.customerPhone}`, { x: 30, y: 710, size: 10, font });
  page.drawText(`${data.customerEmail}`, { x: 30, y: 695, size: 10, font });
  page.drawText(`${data.customerAddress}`, { x: 30, y: 680, size: 10, font });

  page.drawText('INVOICE FROM :', { x: 400, y: 750, size: 12, font: boldFont });
  page.drawText(data.companyName, { x: 400, y: 730, size: 14, font: boldFont });
  page.drawText(`${data.companyPhone}`, { x: 400, y: 710, size: 10, font });
  page.drawText(`${data.companyEmail}`, { x: 400, y: 695, size: 10, font });
  page.drawText(`${data.companyAddress}`, { x: 400, y: 680, size: 10, font });

  // Table
  const tableTop = 650;
  const tableLeft = 30;
  const tableWidth = 535;
  const rowHeight = 30;
  const colWidths = [270, 80, 80, 105];

  // Table headers
  page.drawRectangle({
    x: tableLeft,
    y: tableTop - rowHeight,
    width: tableWidth,
    height: rowHeight,
    color: rgb(0, 0, 0),
  });
  
  const headers = ['PRODUCTS', 'QTY', 'PRICE', 'TOTAL'];
  headers.forEach((header, i) => {
    let x = tableLeft + colWidths.slice(0, i).reduce((sum, w) => sum + w, 0);
    page.drawText(header, { x: x + 10, y: tableTop - 20, size: 12, font: boldFont, color: white });
  });

  // Table rows
  data.items.forEach((item, index) => {
    const y = tableTop - (index + 2) * rowHeight;
    page.drawLine({
      start: { x: tableLeft, y },
      end: { x: tableLeft + tableWidth, y },
      thickness: 1,
      color: rgb(0.9, 0.9, 0.9),
    });
    const itemDetails = [item.name, item.qty, item.price, item.total];
    itemDetails.forEach((text, i) => {
      let x = tableLeft + colWidths.slice(0, i).reduce((sum, w) => sum + w, 0);
      page.drawText(text.toString(), { x: x + 10, y: y + 10, size: 10, font });
    });
  });

  // Totals
  const totalsStart = tableTop - (data.items.length + 1.7) * rowHeight;
  page.drawText('Sub-total ', { x: 40, y: totalsStart, size: 10, font });
  page.drawText(`${data.subtotal}`, { x: 470, y: totalsStart, size: 10, font });
  page.drawText('Tax ', { x: 40, y: totalsStart - 20, size: 10, font });
  page.drawText(`${data.tax}`, { x: 470, y: totalsStart - 20, size: 10, font });
  page.drawLine({
    start: { x: 30, y: totalsStart - 30 },
    end: { x: 560, y: totalsStart - 30 },
    thickness: 1,
  });
  page.drawText('Total ', { x: 40, y: totalsStart - 50, size: 14, font: boldFont });
  page.drawText(`${data.total}`, { x: 470, y: totalsStart - 50, size: 14, font: boldFont });
  
  // Optional Notes Section (below totals)
  const notesY = totalsStart - 180;
  if (data.notes && Array.isArray(data.notes)) {
    let lineHeight = 15;
    let bulletY = notesY; 
    
    page.drawText('Notes/Disclaimers:', { x: 30, y: bulletY, size: 10, font: boldFont, color: black });
    
    data.notes.forEach((note, index) => {
      bulletY -= lineHeight; 
      page.drawText(`${index + 1}. ${note}`, { x: 30, y: bulletY, size: 10, font, color: darkGray });
    });
  }

  // Company Branding
  page.drawText(`${data.companyUrl}`, { x: 400, y: 110, size: 10, font });
  page.drawText(`${data.supportEmail}`, { x: 400, y: 95, size: 10, font });

  // Footer
  // Logo
  page.drawImage(logoImage, {
    x: 400,
    y: 160 - logoDims.height,
    width: logoDims.width,
    height: logoDims.height,
  });
  
  // QR
  page.drawImage(qrImage, {
    x: 30,
    y: 170 - qrDims.height,
    width: qrDims.width,
    height: qrDims.height,
  });

  // Bottom design element
  page.drawRectangle({
    x: 0,
    y: -1,
    width: 595,
    height: 40,
    color: rgb(0, 0, 0),
  });
}
