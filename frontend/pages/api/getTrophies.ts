// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import trophies from "../../data/trophies";

const {trophyTitles} = trophies;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    trophyTitles.sort(function(a, b){return new Date(b.lastUpdatedDateTime).getTime() - new Date(a.lastUpdatedDateTime).getTime()});
    const requestbody = trophyTitles.map((res)=>{
        return {
          gameTitle : res.trophyTitleName,
          trophies : res.definedTrophies,
          progress : res.progress,
          earnedTrophies : res.earnedTrophies,
          platform :res.trophyTitlePlatform,
          image : res.trophyTitleIconUrl,
          lastUpdated : res.lastUpdatedDateTime
        }
    })
  res.status(200).json(requestbody);
}

// {
//   "npServiceName": "trophy2",
//   "npCommunicationId": "NPWR27683_00",
//   "trophySetVersion": "01.00",
//   "trophyTitleName": "英雄伝説 黎の軌跡",
//   "trophyTitleIconUrl": "https://psnobj.prod.dl.playstation.net/psnobj/NPWR27683_00/e7bbf730-f6ea-4cb8-b322-4875391e7168.PNG",
//   "trophyTitlePlatform": "PS5",
//   "hasTrophyGroups": false,
//   "definedTrophies": {
//     "bronze": 42,
//     "silver": 8,
//     "gold": 2,
//     "platinum": 1
//   },
//   "progress": 100,
//   "earnedTrophies": {
//     "bronze": 42,
//     "silver": 8,
//     "gold": 2,
//     "platinum": 1
//   },
//   "hiddenFlag": false,
//   "lastUpdatedDateTime": "2022-07-31T10:35:18Z"
// },