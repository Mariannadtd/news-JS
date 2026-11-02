import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        const baseLink = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (!baseLink) {
            throw new Error('API_URL is not defined');
        }

        if (!apiKey) {
            throw new Error('API_KEY is not defined');
        }

        super(baseLink, {
            apiKey,
        });
    }
}

export default AppLoader;
