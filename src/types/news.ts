export type ApiStatus = 'ok' | 'error';

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface NewsResponse {
    status: ApiStatus;
    totalResults: number;
    articles: Article[];
}

export interface SourcesResponse {
    status: ApiStatus;
    sources: Source[];
}

export interface ApiErrorResponse {
    status: 'error';
    code: string;
    message: string;
}
