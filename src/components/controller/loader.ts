export enum HttpMethod {
    GET = 'GET',
}

export type QueryValue = string | number | boolean | undefined;

export interface QueryParameters {
    apiKey: string;
    sources: string;
    q: string;
    page: number;
    pageSize: number;
    language: string;
    country: string;
    category: string;
    sortBy: 'relevancy' | 'popularity' | 'publishedAt';
}

export type QueryOptions = Partial<QueryParameters>;

export type ResponseCallback<T> = (data: T) => void;

export interface RequestConfig {
    endpoint: string;
    options?: QueryOptions;
}

class Loader {
    private readonly baseLink: string;
    private readonly options: QueryOptions;

    public constructor(baseLink: string, options: QueryOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestConfig,
        callback: ResponseCallback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(response: Response): Response {
        if (!response.ok) {
            if (response.status === 401 || response.status === 404) {
                console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
            }

            throw new Error(response.statusText);
        }

        return response;
    }

    private makeUrl(options: QueryOptions, endpoint: string): string {
        const url = new URL(endpoint, this.baseLink);
        const urlOptions: QueryOptions = {
            ...this.options,
            ...options,
        };

        (Object.entries(urlOptions) as Array<[keyof QueryParameters, QueryValue]>).forEach(([key, value]): void => {
            if (value !== undefined) {
                url.searchParams.set(key, String(value));
            }
        });

        return url.toString();
    }

    private load<T>(
        method: HttpMethod,
        endpoint: string,
        callback: ResponseCallback<T>,
        options: QueryOptions = {}
    ): void {
        void fetch(this.makeUrl(options, endpoint), { method })
            .then((response: Response): Response => this.errorHandler(response))
            .then((response: Response): Promise<T> => response.json() as Promise<T>)
            .then((data: T): void => callback(data))
            .catch((error: unknown): void => {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error('Unknown request error');
                }
            });
    }
}

export default Loader;
