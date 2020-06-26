import { library } from '../../services/library';
import { Catalog } from '../catalog/Catalog';
import { fedWithMovies } from '../../hoc/fedWithMovies';

export const CatalogWatched = fedWithMovies(Catalog, library.personal.moviesWatched);
