const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

interface IShow {
  id: number;
  name: string;
  summary: string;
  image: string;
}

interface IEpisode {
  id: number;
  name: string;
  season: string;   // TODO: double check: is this a number?
  number: number;
}  // TODO: Move these interfaces to the interfaces file.

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

  const searchResults = await response.json();  // TODO: Typing (Another interface?)

  // TODO: string, any is too vague
  // No need to type what you're not accessing, so you could use an interface
  // IShowResult -- this is what the API gave us. Allows flexibility for img.
  // Only thing you need typed is what you're referencing (in your interface).
  const shows: IShow[] = searchResults.map((searchResult: Record<string, any>) => {
    const {id, name, summary, image } = searchResult.show;
    const showResult: IShow = {
      id,
      name,
      summary,
      image: image ? image.medium : MISSING_IMAGE_URL,
    };
    return showResult;
  });

  return shows;
}

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number): Promise<IEpisode[]> {
  const response = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);
  const searchResults = await response.json();
  console.log("searchResults:", searchResults);

  // returns an object if not found.
  // TODO: use response.ok instead.
  if (!(searchResults instanceof Array)) {
    throw new Error(`${searchResults.status}: ${searchResults.name}`);
  }

  // TODO: probably replace record with IEpisode in searchResult typing.
  const episodes: IEpisode[] = searchResults.map((searchResult: Record<string, any>) => {
    const { id, name, season, number } = searchResult;
    const filteredData: IEpisode = { id, name, season, number };
    return filteredData;   // TODO: perhaps redundant to make the variable to return it.
  });

  console.log('Show id:', id);
  console.log('Episodes found:', episodes);
  return episodes;
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  type IShow,
  type IEpisode,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
