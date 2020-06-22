import { library } from '../../services/library';
import { Catalog } from '../catalog/Catalog';
import { fedWithMovies } from '../../hoc/fedWithMovies';

export const CatalogToWatch = fedWithMovies(Catalog, library.moviesToWatch);
