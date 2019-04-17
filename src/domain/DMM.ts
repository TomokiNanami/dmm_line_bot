import fetch from 'node-fetch';
import { DmmResponse } from "../interface/DmmResponse";

/**
 * DMMの(大げさ)ドメインクラス
 */
export class DMM {

    private URL;
    private OUTPUT_TYPE;

    constructor() {
        this.URL = process.env.DMM_API_URL;
        this.OUTPUT_TYPE = '&output=json';
    }

    public async fetch(keyword: string): Promise<DmmResponse> {

        const url: string = this.toURL(keyword);
        const response = await fetch(url);
        const contents: DmmResponse = await response.json();
        console.log(contents);

        if (this.isNotFound(contents)) {
            throw new Error('商品が見つかりませんでした。');
        }

        return contents;

    }

    /**
     * 検索ワードをエンコードしてURLにする。
     * @param param
     */
    private toURL(param: string) {
        const encodedParam = encodeURI(param);
        return this.URL + encodedParam + this.OUTPUT_TYPE;
    }

    /**
     * 商品が見つからなかった
     * @param contents
     */
    private isNotFound(contents: DmmResponse) {
        return contents.result.total_count === 0;
    }
}