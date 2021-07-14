"use strict";

import { login_cellphone, user_cloud, user_record, recommend_songs, user_account} from 'NeteaseCloudMusicApi'
import { Request, Response } from "express"

export const hot = async (req: Request, res: Response) => {
  // try {
  //   const result = await login_cellphone({
  //     phone: '18616813528',
  //     password: ''
  //   })
  //   console.log(result)
  //   const result2 = await user_cloud({
  //     cookie: result.body.cookie // 凭证
  //   })
  //   console.log(result2.body)
  // } catch (e) {
  //   console.log(e)
  // }
  const reulst  = await recommend_songs({
    cookie:'__csrf=c3573b1cdc3d313bcdbeaef481091911; Max-Age=1296010; Expires=Wed, 21 Jul 2021 02:49:46 GMT; Path=/;;NMTID=00ONeFqCH-szREVekg8glgilpjkCzQAAAF6ebiOWw; Max-Age=315360000; Expires=Fri, 4 Jul 2031 02:49:36 GMT; Path=/;;MUSIC_U=fb8c5ba5b24ea497f10590b1ac8a1be0b7c37e654428ade75cf73b684bbc49669cb4377b2d7ba249; Max-Age=1296000; Expires=Wed, 21 Jul 2021 02:49:36 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Wed, 21 Jul 2021 02:49:36 GMT; Path=/;'
  });

  return res.json(reulst)
}

export const recommend = async(req: Request, res: Response) => {
  
  const reulst  = await user_record({
   uid: '369629365'
  });
  return res.json(reulst)
}


