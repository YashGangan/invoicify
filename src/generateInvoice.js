import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs/promises';
import qr from 'qr-image';

export async function generateInvoice(template, data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Company Logo
  const logoFile = await fs.readFile(data.logoPath)
  const logoBytes = new Uint8Array(logoFile);
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const logoDims = logoImage.scaleToFit(100, 200); 

  // QR Code
  const qrData = `Invoice No: ${data.invoiceNumber}, Date: ${data.invoiceDate}, Total: ${data.total}`;
  const qrPng = qr.imageSync(qrData, { type: 'png' });
  const qrImage = await pdfDoc.embedPng(qrPng);
  const qrDims = qrImage.scale(0.5);

  // Apply template
  await template(page, { font, boldFont, rgb, data, logoImage, logoDims, qrImage, qrDims });

  return pdfDoc.save();
}