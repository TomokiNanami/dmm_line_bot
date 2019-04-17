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
    private readonly NOT_FOUND = 0;

    constructor(presenter: IResponseType) {
        this.presenter = presenter;
    }

    /**
     * 送信されたキーワードでDMMに問い合わせを行い、コンテンツを取得する。
     * 返却方法に関しては呼び出し元からDIしてもらう。
     * @param req
     * @param res
     */
    public async fetchContents(req, res): Promise<Types.TemplateMessage | Types.TextMessage> {

        try {
            const sendKeyword: string = DmmController.getSendText(req);

            if (sendKeyword === '') {
                return { type: 'text', text: 'キーワードはテキストだけ受け付けてるよ!' }
            }

            const dmm = new DMM();
            const contents: DmmResponse = await dmm.fetch(sendKeyword);

            return this.isNotFound(contents) ?
                { type: 'text', text: '商品が見つからなかったよ…。キーワードを変えてもう一度送ってみてね。' } :
                this.presenter.dataExport(contents);
        } catch (e) {
            throw e;
        }

    }

    /**
     * Lineのリクエストからテキストのみを抽出する。
     * テキスト以外(例えば画像等)が送られた場合は空文字を返却する。
     * @param req
     */
    private static getSendText(req): string {

        const messageEvent: Types.MessageEvent = req.body.events[ 0 ];
        const textEventMessage: Types.TextEventMessage | any = messageEvent.message;

        if (textEventMessage.type !== 'text') {
            return '';
        }

        return textEventMessage.text;

    }

    /**
     * 商品が見つからなかった。
     * @param contents
     */
    private isNotFound(contents: DmmResponse) {
        return contents.result.total_count === this.NOT_FOUND;
    }
}