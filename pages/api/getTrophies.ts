// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import trophies from "../../data/trophies";

const {trophyTitles} = trophies;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    trophyTitles.sort(function(a, b){return b.earnedTrophies.platinum - a.earnedTrophies.platinum});
  res.status(200).json(trophyTitles);
}
