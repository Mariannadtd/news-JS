import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { NewsResponse, SourcesResponse } from '../../types/news';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement = document.querySelector<HTMLElement>('.sources');

        if (!sourcesElement) {
            throw new Error('Sources container was not found');
        }

        sourcesElement.addEventListener('click', (event: MouseEvent): void => {
            this.controller.getNews(event, (data: NewsResponse): void => {
                this.view.drawNews(data);
            });
        });

        this.controller.getSources((data: SourcesResponse): void => {
            this.view.drawSources(data);
        });
    }
}

export default App;
