import { DmmResponse } from "../interface/DmmResponse";

/**
 * 返却する商品の開始地点と終了地点インタフェース
 */
export interface ItemSearchNumber {
    start: number;
    end: number;
}

/**
 * Lineのレスポンス形式抽象クラス
 */
export abstract class IResponseType {

    public abstract dataExport(data: DmmResponse);

    private readonly FIRST_ITEM = 0;
    private readonly RETURN_MAX_COLUMN = 5;

    /**
     * 返却対象の商品を特定する。
     *   ・ヒットした商品が5件以下の時、全て対象
     *   ・ヒットした商品が6件以上の時、(商品数 - 5)～(開始地点 + 5)の商品が対象
     * @param hitItemNum
     */
    protected getRandomStartNumber(hitItemNum: number): ItemSearchNumber {

        // 5件以下の時ヒットした商品全て対象
        if (hitItemNum <= this.RETURN_MAX_COLUMN) {
            console.log('ヒットした商品が5件以下');
            return {
                start: 0,
                end: hitItemNum,
            }
        }

        // 必ず5件返したいため商品数 - 5の値を最大開始地点とする。
        const startMaxNum = hitItemNum - this.RETURN_MAX_COLUMN;

        const start = this.getRandomNumBetweenMin(startMaxNum);
        const end = start + this.RETURN_MAX_COLUMN;

        console.log(`itemLength: ${hitItemNum}`);
        console.log(`start: ${start}, end: ${end}`);

        return {
            start,
            end
        }
    }

    /**
     * 0から渡された引数を含む数字の間で乱数を生成する。
     *   (例) 引数が5なら、0~5の間で乱数を生成する。
     *
     * @param max
     */
    private getRandomNumBetweenMin(max: number): number {
        return Math.floor(Math.random() * (max + 1 - this.FIRST_ITEM)) + this.FIRST_ITEM;
    }
}