/**
 * Lineのレスポンス形式抽象クラス
 */
import { DmmResponse } from "../interface/DmmResponse";

export abstract class IResponseType {
    public abstract dataExport(data: DmmResponse);
}