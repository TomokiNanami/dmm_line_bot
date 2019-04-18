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
        const result = await dmm.fetchContents(req, res);
        console.log('result確認 -----');
        console.log(result);
        console.log('result確認 -----');
        const reply = await client.replyMessage(req.body.events.replyToken, result);
        res.json(JSON.stringify(reply));
    } catch (e) {
        console.error(e);
        const reply = await client.replyMessage(req.body.events.replyToken, {
            type: 'text',
            text: 'Oops! Botがバグったようだ…。作成者も使ってるので連絡してくれ!'
        });
        res.json(JSON.stringify(reply));
    }
});

export default router;