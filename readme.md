# Invoicify

## Table of Contents
1. [Introduction](#introduction)
2. [Example](#example)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Reference](#api-reference)
6. [Invoice Data Format](#invoice-data-format)
7. [Troubleshooting](#troubleshooting)

## Introduction

Invoicify is a Node.js package that creates professional PDF invoices. It uses the `pdf-lib` library for PDF generation and includes a basic invoice template.

## Example

![Template 1: Basic](https://github.com/YashGangan/invoicify/blob/master/example/invoice.png?raw=true)

## Installation

To install the invoicify package, run the following command in your project directory:

```bash
npm install invoicify
```

## Usage

To generate an invoice using this package:

1. Import the necessary functions:
   ```javascript
   import { generateInvoice, basic } from 'invoicify';
   ```

2. Prepare your invoice data:
   ```javascript
   const invoiceData = {
     companyName: 'Your Company',
     companyUrl: 'www.yourcompany.com',
     logoPath: './path/to/your/logo.png',
     // ... (other invoice details)
   };
   ```

3. Generate the PDF:
   ```javascript
   const pdfBytes = await generateInvoice(basic, invoiceData);
   ```

4. Save the PDF:
   ```javascript
   import fs from 'fs/promises';
   await fs.writeFile('invoice.pdf', pdfBytes);
   ```

## API Reference

### `generateInvoice(template, data)`

Generates a PDF invoice based on the provided template and data.

Parameters:
- `template`: The invoice template function (use `basic` for the default template)
- `data`: An object containing invoice information (see [Invoice Data Format](#invoice-data-format))

Returns: A Promise that resolves to PDF bytes

### `basic`

The default invoice template function. Pass this to `generateInvoice` to use the basic template.

## Invoice Data Format

The `data` object passed to `generateInvoice` should have the following format:

```javascript
{
  companyName: String,
  companyUrl: String,
  logoPath: String,
  companyPhone: String,
  companyEmail: String,
  companyAddress: String,
  invoiceNumber: String,
  invoiceDate: String,
  customerName: String,
  customerAddress: String,
  customerEmail: String,
  customerPhone: String,
  items: [
    { name: String, qty: String, price: String, total: String },
    // ... more items
  ],
  subtotal: String,
  shipping: String,
  tax: String,
  total: String,
  supportEmail: String,
  notes: [String] 
}
```

## Troubleshooting

Common issues and solutions:

1. **Missing dependencies**: Ensure all peer dependencies are installed (pdf-lib, qr-image)
2. **File not found**: Check that the `logoPath` in your invoice data points to a valid image file
3. **Incorrect data format**: Verify that your invoice data object matches the expected structure

For further assistance, please open an issue on the package's GitHub repository.