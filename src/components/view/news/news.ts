import './news.css';
import type { Article } from '../../../types/news';

type NewsCard = Readonly<
    Pick<Article, 'source' | 'author' | 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt'>
>;

class News {
    public draw(data: ReadonlyArray<NewsCard>): void {
        const visibleNews = data.slice(0, 10);
        const fragment = document.createDocumentFragment();
        const newsItemTemplate = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!newsItemTemplate || !newsContainer) {
            throw new Error('News template or container was not found');
        }

        visibleNews.forEach((item: NewsCard, index: number): void => {
            const newsClone = newsItemTemplate.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
            const date = newsClone.querySelector<HTMLElement>('.news__meta-date');
            const title = newsClone.querySelector<HTMLElement>('.news__description-title');
            const source = newsClone.querySelector<HTMLElement>('.news__description-source');
            const description = newsClone.querySelector<HTMLElement>('.news__description-content');
            const readMoreLink = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');

            if (!newsItem || !photo || !author || !date || !title || !source || !description || !readMoreLink) {
                throw new Error('News template structure is invalid');
            }

            if (index % 2 !== 0) {
                newsItem.classList.add('alt');
            }

            photo.style.backgroundImage = item.urlToImage
                ? `url("${item.urlToImage}")`
                : 'linear-gradient(135deg, #0f766e, #1d4ed8)';

            author.textContent = item.author ?? item.source.name;
            date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            title.textContent = item.title;
            source.textContent = item.source.name;
            description.textContent = item.description ?? '';
            readMoreLink.href = item.url;

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.append(fragment);
    }
}

export default News;
