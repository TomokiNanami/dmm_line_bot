import { IResponseType } from "../presenter/IResponseType";
import { DMM } from "../domain/DMM";
import * as Types from "@line/bot-sdk";
import { DmmResponse } from "../interface/DmmResponse";

/**
 * コントローラークラス
 * インスタンス生成時にPresenterをDIする。
 */
export class DmmController {

    private presenter: IResponseType;

    constructor(presenter: IResponseType) {
        this.presenter = presenter;
    }

    /**
     * 送信されたキーワードでDMMに問い合わせを行い、コンテンツを取得する。
     * 返却方法に関しては呼び出し元からDIしてもらう。
     * @param req
     * @param res
     */
    public async fetchContents(req, res): Promise<Types.TemplateMessage> {

        try {
            const sendKeyword: string = DmmController.getSendText(req);

            const dmm = new DMM();
            const contents: DmmResponse = await dmm.fetch(sendKeyword);
            return this.presenter.dataExport(contents);
        } catch (e) {
            console.error(e);
            throw e;
        }

    }

    /**
     * Lineのリクエストからテキストのみを抽出する。
     * テキスト以外(例えば画像等)が送られた場合は例外を投げる。
     * @param req
     */
    private static getSendText(req): string {

        const messageEvent: Types.MessageEvent = req.body.events[ 0 ];
        const textEventMessage: Types.TextEventMessage | any = messageEvent.message;

        if (textEventMessage.type !== 'text') {
            throw new Error('テキスト以外が送信されました。');
        }

        return textEventMessage.text;

    }
}