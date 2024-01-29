import { I } from "vitest/dist/reporters-1evA5lom.js";

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

interface IShow {
  id: number;
  name: string;
  summary: string;
  image: string;
}

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string): Promise<IShow[]> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  console.log('making request to api to get shows');
  // Make request to TVMaze search shows API.
  const params = new URLSearchParams({ q: term });
  const response = await fetch(`${TVMAZE_API_URL}search/shows?${params}`);

  const searchResults = await response.json();

  const shows: IShow[] = searchResults.map((searchResult: Record<string, any>) => {
    const { id, name, summary } = searchResult.show;
    const image: string = searchResult.show.image
      ? searchResult.show.image.medium
      : MISSING_IMAGE_URL;
    const filteredData: IShow = { id, name, summary, image };

    return filteredData;
  });

  return shows;
}

interface IEpisode {
  id: number;
  name: string;
  season: string;
  number: number;
}

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number): Promise<IEpisode[]> {
  const response = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);
  const searchResults = await response.json();
  console.log("searchResults:", searchResults);

  // returns an object if not found, so an object returned means not found
  if (!(searchResults instanceof Array)) {
    throw new Error(`${searchResults.status}: ${searchResults.name}`);
  }

  const episodes: IEpisode[] = searchResults.map((searchResult: Record<string, any>) => {
    const { id, name, season, number } = searchResult;
    const filteredData: IEpisode = { id, name, season, number };
    return filteredData;
  });

  console.log('Show id:', id);
  console.log('Episodes found:', episodes);
  return episodes;
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  type IShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
