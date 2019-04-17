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

        try {

            const url: string = this.toURL(keyword);
            const response = await fetch(url);
            const contents: DmmResponse = await response.json();
            console.log(contents);
            console.log(typeof contents);

            return contents;

        } catch (e) {
            throw new Error(e);
        }

    }

    /**
     * 検索ワードをエンコードしてURLにする。
     * @param param
     */
    private toURL(param: string) {
        const encodedParam = encodeURI(param);
        return this.URL + encodedParam + this.OUTPUT_TYPE;
    }

}