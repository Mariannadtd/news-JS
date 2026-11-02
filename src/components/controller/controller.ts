import AppLoader from './appLoader';
import type { ResponseCallback } from './loader';
import type { NewsResponse, SourcesResponse } from '../../types/news';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(event: MouseEvent, callback: ResponseCallback<NewsResponse>): void {
        const clickedElement = event.target;
        const newsContainer = event.currentTarget;

        if (!(clickedElement instanceof Element)) {
            return;
        }

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        const sourceItem = clickedElement.closest<HTMLElement>('.source__item');

        if (!sourceItem || !newsContainer.contains(sourceItem)) {
            return;
        }

        const sourceId = sourceItem.dataset.sourceId;

        if (!sourceId || newsContainer.dataset.source === sourceId) {
            return;
        }

        newsContainer.dataset.source = sourceId;

        super.getResp<NewsResponse>(
            {
                endpoint: 'everything',
                options: {
                    sources: sourceId,
                },
            },
            callback
        );
    }
}

export default AppController;
