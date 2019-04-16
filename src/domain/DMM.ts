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

    public async fetch(keyword: string) {
        // TODO: Nodeから外部のAPIをたたく方法調査しておく
        // const contents = await http.request(this.toURL(keyword), res => {
        //     res.on("data", contents => {
        //         return contents;
        //     });
        // });

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