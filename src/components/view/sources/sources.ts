import './sources.css';
import type { Source } from '../../../types/news';

type SourceListItem = Readonly<Pick<Source, 'id' | 'name'>>;

class Sources {
    public draw(data: ReadonlyArray<SourceListItem>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemplate = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (!sourceItemTemplate || !sourcesContainer) {
            throw new Error('Sources template or container was not found');
        }

        data.forEach((item: SourceListItem): void => {
            const sourceClone = sourceItemTemplate.content.cloneNode(true) as DocumentFragment;
            const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');

            if (!sourceName || !sourceItem) {
                throw new Error('Source template structure is invalid');
            }

            sourceName.textContent = item.name;
            sourceItem.dataset.sourceId = item.id;

            fragment.append(sourceClone);
        });

        sourcesContainer.append(fragment);
    }
}

export default Sources;
