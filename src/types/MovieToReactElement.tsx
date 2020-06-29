import { ReactElement } from 'react';

import { Movie } from '../services/library/movies';

export type MovieToReactElement = (movieId: Movie) => ReactElement;
