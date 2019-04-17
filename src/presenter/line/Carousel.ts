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

            // レビューは無いものもあるため
            const review_count = typeof item.review !== "undefined" ? item.review.count : 0;
            const review_average = typeof item.review !== "undefined" ? item.review.average : '0';

            const column: Types.TemplateColumn = {
                thumbnailImageUrl: item.imageURL.large,
                title: item.title,
                text: `レビュー数: ${review_count}\nレビュー平均: ${review_average}`,
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