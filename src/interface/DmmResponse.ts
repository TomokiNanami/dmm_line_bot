export interface DmmResponse {
    result: DmmResult
}

interface DmmResult {
    status: number;
    result_count: number;
    total_count: number;
    first_position: number;
    items: Item[];
}

export interface Item {
    service_code: string;
    service_name: string;
    floor_code: string;
    floor_name: string;
    category_name: string;
    content_id: string;
    product_id: string;
    title: string;
    volume: string;
    review: Review;
    URL: string;
    URLsp: string;
    affiliateURL: string;
    affiliateURLsp: string;
    imageURL: ImageURL;
    sampleImageURL: SampleImageURL;
    sampleMovieURL: SampleMovieURL;
    prices: Prices;
    date: string;
    iteminfo: ItemInfo;
}

interface Review {
    count: number;
    average: number;
}

interface ImageURL {
    list: string;
    small: string;
    large: string;
}

interface SampleImageURL {
    sample_s: Sample_s;
}

interface Sample_s {
    image: string[];
}

interface SampleMovieURL {
    size_476_306: string;
    size_560_360: string;
    size_644_414: string;
    size_720_480: string;
    pc_flag: number;
    sp_flag: number;
}

interface Prices {
    price: string;
    deliveries: Deliveries;
}

interface Deliveries {
    delivery: Delivery[];
}

interface Delivery {
    type: string;
    price: string;
}

interface ItemInfo {
    genre: Genre[];
    series: Series[];
    maker: Maker[];
    actress: Actress[];
    director: Director[];
    label: Label[];
}

interface Genre {
    id: number;
    name: string;
}

interface Series {
    id: number;
    name: string;
}

interface Maker {
    id: number;
    name: string;
}

interface Actress {
    id: number;
    name: string;
    ruby: string;
}

interface Director {
    id: number;
    name: string;
    ruby: string;
}

interface Label {
    id: number;
    name: string;
}