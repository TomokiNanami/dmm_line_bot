import * as express from 'express';
import * as Types from '@line/bot-sdk';
import { Client, middleware } from '@line/bot-sdk';
import { DmmController } from '../controller/DmmController';
import { Carousel } from "../presenter/line/Carousel";

const config: Types.ClientConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.CHANNEL_SECRET || '',
};
const middleConfig: Types.MiddlewareConfig = {
    channelSecret: process.env.CHANNEL_SECRET || '',
};

const client = new Client(config);

let router = express.Router();

router.post('/', middleware(middleConfig), async (req, res) => {
    try {
        const dmm = new DmmController(new Carousel());
        console.log('1 dmmに問い合わせ');
        const result = await dmm.fetchContents(req, res);
        console.log(`9 問い合わせ終了`);
        console.log(result);
        console.log(`10 reply`);
        console.log(`11 response json`);
        res.json(await client.replyMessage(req.body.events.replyToken, result));
    } catch (e) {
        console.error(e);
        res.json(await client.replyMessage(req.body.events.replyToken,
            {
                type: 'text',
                text: 'Oops! Botがバグったようだ…。作成者も使ってるので連絡してくれ!'
            }
        ));
    }
});

export default router;