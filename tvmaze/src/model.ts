import { IShowResult, IShow, IEpisode } from "./interfaces";

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string): Promise<IShow[]> {
  console.log('making request to api to get shows');
  // Make request to TVMaze search shows API.
  const params = new URLSearchParams({ q: term });
  const response = await fetch(`${TVMAZE_API_URL}search/shows?${params}`);

  const searchResults: IShowResult[] = await response.json();

  const shows: IShow[] = searchResults.map((searchResult) => {
    const {id, name, summary, image } = searchResult.show;
    return {
      id,
      name,
      summary,
      image: image ? image.medium! : MISSING_IMAGE_URL,
    };
  });

  return shows;
}

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number): Promise<IEpisode[]> {
  const response = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`${error.status}: ${error.name}`);
  }

  const episodes: IEpisode[] = await response.json();

  console.log('Show id:', id);
  console.log('Episodes found:', episodes);
  return episodes;
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
