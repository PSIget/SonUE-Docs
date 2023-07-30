// Import Next.js types
import { NextApiRequest, NextApiResponse } from 'next';

// Import your data from data.json
import game from 'data/downloads.json';

// You can create a type for your data if you wish
type game = typeof game;

const handler = (req: NextApiRequest, res: NextApiResponse<game>): void => {
  // Check the HTTP request method
  if (req.method === 'GET') {
    // Send the data in the response
    res.status(200).json(game);
  } else {
    // If the request method is not GET, return 405 Method Not Allowed
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
