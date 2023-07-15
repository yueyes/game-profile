// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import userData from "../../data/profile";

const {profile} = userData;

export interface IUserData{
  username : string;
  avatarUrl : string;
  aboutMe : string;
  languageUsed : string[];
  trophySummary :{
    level : number;
    progress: number;
    earnedTrophies : {
      platinum : number;
      gold : number;
      silver : number;
      bronze : number;
    }
  };
  firstName : string;
  lastName : string;
  profilePictureUrl : string;
  personalDetailSharing : boolean;
  isOnline : boolean;
  lastOnlineDate : string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserData>
) {

  const responseBody :IUserData = {
    username : profile.onlineId,
    avatarUrl : profile.avatarUrls[0].avatarUrl,
    languageUsed : profile.languagesUsed,
    aboutMe : profile.aboutMe,
    trophySummary : profile.trophySummary,
    firstName : profile.personalDetail.firstName,
    lastName : profile.personalDetail.lastName,
    profilePictureUrl : profile.personalDetail.profilePictureUrls[0].profilePictureUrl,
    personalDetailSharing : profile.personalDetailSharing !== "no",
    isOnline : profile.presences[0].onlineStatus === "online",
    lastOnlineDate : profile.presences[0].lastOnlineDate
  }

  res.status(200).json(responseBody);
}