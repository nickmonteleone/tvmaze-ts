import $ from 'jquery';
import { getEpisodesOfShow, searchShowsByTerm, IShow, IEpisode } from "./model.ts";


// get html elements with jquery
// const $showsList: JQuery<HTMLElement> = $("#showsList");   // Type?
const $showsList = $("#showsList");   // Type? Another low-risk situation like on line ~22
const $episodesList: JQuery<HTMLElement> = $("#episodesList");
const $episodesArea: JQuery<HTMLElement> = $("#episodesArea");
const $searchForm: JQuery<HTMLElement> = $("#searchForm");

/** Given list of shows, create markup for each and to DOM
 *
 * Input: shows [{id, name, summary, image},...]
*/

function populateShows(shows: IShow[]): void {
  $showsList.empty();
  // const x = "https://static.tvmaze.com/" +           // TODO: no.
  //   "uploads/images/medium_portrait/160/401704.jpg";
  for (let show of shows) {
    const $show: JQuery<HTMLElement> = $(     // TODO: Overkill to type this? A: good to practice. fn sig, args, return.
    // This is a low-risk var. Nobody will mistake this.
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image}
              alt="${show.name}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay(): Promise<void> {
  // const term = $("#searchForm-term").val() as string;   // TODO: as string okay? perhaps bias toward as string since someone else's method can return multiple things
  const term: string = $("#searchForm-term").val();   // TODO: as string okay? perhaps bias toward as string since someone else's method can return multiple things
  const shows: IShow[] = await searchShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit",
  async function (evt: JQuery.SubmitEvent): Promise<void> {
    evt.preventDefault();
    await searchForShowAndDisplay();
  });

/** Given list of episodes, create markup for each and to DOM
 *
 * Input: episodes [{id, name, season, number},...]
*/

function populateEpisodes(episodes: IEpisode[]) {
  $episodesList.empty();

  for (const episode of episodes) {
    const $episode: JQuery<HTMLElement> = $(
      `<li>
         ${episode.name}
         (season ${episode.season}, episode ${episode.number})
       </li>
      `);

    $episodesList.append($episode);
    $episodesArea.show();
  }
}

/** Handle click to show episodes for a show */

async function retrieveEpisodesAndDisplay(showId: number): Promise<void> {
  const episodes: IEpisode[] = await getEpisodesOfShow(showId);  // TODO: could be in click handler
  populateEpisodes(episodes);
}

$showsList.on("click", ".Show-getEpisodes",
  async function (evt: JQuery.ClickEvent): Promise<void> {
    const showId: number = Number(   // TODO: Again, probably overkill to type
      $(evt.target).closest(".Show").data("show-id")
    );
    await retrieveEpisodesAndDisplay(showId);
  });
