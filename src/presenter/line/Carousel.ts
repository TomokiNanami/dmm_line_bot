import { IResponseType } from "../IResponseType";
import { DmmResponse, Item } from "../../interface/DmmResponse";
import * as Types from "@line/bot-sdk";

/**
 * Lineのレスポンス形式実装クラス
 * カルーセル版
 */
export class Carousel extends IResponseType {

    public dataExport(data: DmmResponse): Types.TemplateMessage {

        let columns: Types.TemplateColumn[] = [];

        for (let i = 0; i < 3; i++) {
            const item: Item = data.result.items[ i ];
            console.log('Item確認');
            console.log(item);
            const column: Types.TemplateColumn = {
                thumbnailImageUrl: item.imageURL.large,
                title: item.title,
                text: `レビュー数: ${item.review.count}\nレビュー平均: ${item.review.average}`,
                actions: [
                    {
                        type: 'uri',
                        label: '商品ページへ',
                        uri: item.URLsp
                    },
                ]
            };
            columns.push(column);
        }

        return {
            type: 'template',
            altText: '電車遅延のため遅れます。',
            template: {
                type: 'carousel',
                columns: columns,
            },
        };
    }
}