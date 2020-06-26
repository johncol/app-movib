import { library } from '../../services/library/api';
import { Catalog } from '../catalog/Catalog';
import { fedWithMovies } from '../../hoc/fedWithMovies';

export const CatalogWatched = fedWithMovies(Catalog, library.moviesWatched);
