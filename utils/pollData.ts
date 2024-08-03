import axios from 'axios';
import connectMongo from './db';
import PriceData from '@/pages/Models/PriceData';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

const fetchCryptoData = async (symbols: string[]) => {
  const ids = symbols.join(',');

  const response = await axios.get(API_URL, {
    params: {
      ids,
      vs_currencies: 'usd',
    },
  });

  return response.data;
};

const pollData = async () => {
  await connectMongo();

  try {
    const symbols = ['bitcoin', 'ethereum', 'dogecoin', 'cardano', 'ripple'];
    const data = await fetchCryptoData(symbols);

    await Promise.all(
      symbols.map(async (symbol) => {
        const price = data[symbol]?.usd;
        if (price) {
          await PriceData.create({
            symbol,
            price,
            timestamp: new Date(),
          });
        }
      })
    );

    console.log('Data polled and stored successfully.');
  } catch (error: any) {
    console.error('Error polling data:', error.message);
  }
};

setInterval(pollData, 15000);
