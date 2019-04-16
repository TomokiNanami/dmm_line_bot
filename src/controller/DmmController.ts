import { IResponseType } from "../presenter/IResponseType";

/**
 * コントローラークラス
 * インスタンス生成時にPresenterをDIする。
 */
export class DmmController {

    private presenter: IResponseType;

    constructor(presenter: IResponseType) {
        this.presenter = presenter;
    }

    public async fetchContents(req: Express.Request, res: Express.Response) {
        return this.presenter.dataExport({});
    }
}