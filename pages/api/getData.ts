import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/utils/db';
import PriceData from '../Models/PriceData';
const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongo();

  try {
    const { symbol } = req.query;
    const data = await PriceData.find({ symbol }).sort({ timestamp: -1 }).limit(20).exec();

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Server Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch data' });
  }
};

export default getData;
