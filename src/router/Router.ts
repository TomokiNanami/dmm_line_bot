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
        await client.replyMessage(req.body.events.replyToken, result);
        res.json(result);
    } catch (e) {
        console.error(e);
        await client.replyMessage(req.body.events.replyToken, {
            type: 'text',
            text: '見つかりませんでした…。キーワードを変えて再度送ってみてね。'
        });
        res.status(500).end();
    }
});

export default router;