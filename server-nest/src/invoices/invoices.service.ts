import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import PDFDocument from 'pdfkit';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async createInvoice(orderId: string, payload: any) {
    const outDir = path.join(process.cwd(), 'data', 'invoices');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const fileName = `invoice-${orderId}-${Date.now()}.json`;
    const filePath = path.join(outDir, fileName);
    const invoiceData = {
      orderId,
      createdAt: new Date().toISOString(),
      payload,
    };

    fs.writeFileSync(filePath, JSON.stringify(invoiceData, null, 2));

    // create DB record - map to Prisma Invoice model
    // generate a simple PDF invoice
    const pdfName = `invoice-${orderId}-${Date.now()}.pdf`;
    const pdfPath = path.join(outDir, pdfName);
    try {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);
      doc.fontSize(20).text('Invoice', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Order ID: ${orderId}`);
      doc.text(`Date: ${new Date().toISOString()}`);
      doc.moveDown();
      doc.text('Details:');
      doc.fontSize(10).text(JSON.stringify(payload || {}, null, 2));
      doc.end();
      // wait for stream finish synchronously-ish
      await new Promise((resolve) => stream.on('finish', resolve));
    } catch (e) {
      // if PDF generation fails, continue and store JSON only
      console.error('PDF creation failed', e?.message || e);
    }

    const invoice = await this.prisma.invoice.create({
      data: {
        orderId,
        amount: payload?.amount ? Number(payload.amount) : 0,
        currency: payload?.currency || 'SUI',
        data: JSON.stringify(payload || {}),
        pdfPath: fs.existsSync(pdfPath) ? pdfPath : null,
      },
    });

    return { invoice, filePath, pdfPath };
  }

  async getInvoices(limit = 20) {
    return this.prisma.invoice.findMany({ take: limit, orderBy: { createdAt: 'desc' } });
  }
}
