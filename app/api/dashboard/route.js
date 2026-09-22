import { NextResponse } from 'next/server';
import { getSheetData } from '../../../lib/googleSheets';
export const revalidate = 0;

export async function GET() {
  try {
    const [sales, production, moulding, dispatch, purchase] = await Promise.all([
      getSheetData(process.env.SALES_SHEET_ID),
      getSheetData(process.env.PRODUCTION_SHEET_ID),
      getSheetData(process.env.MOULDING_SHEET_ID),
      getSheetData(process.env.DISPATCH_SHEET_ID),
      getSheetData(process.env.PURCHASE_SHEET_ID),
    ]);

    return NextResponse.json({
      sales,
      production,
      moulding,
      dispatch,
      purchase,
      updatedAt: new Date().toLocaleTimeString(),
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
