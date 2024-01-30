import $ from 'jquery';
import { getEpisodesOfShow, searchShowsByTerm } from "./model.ts";
import { IShow, IEpisode } from "./interfaces";


// get html elements with jquery
const $showsList = $("#showsList");
const $episodesList = $("#episodesList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

/** Given list of shows, create markup for each and to DOM
 *
 * Input: shows [{id, name, summary, image},...]
*/

function populateShows(shows: IShow[]): void {
  $showsList.empty();
  for (const show of shows) {
    const $show = $(
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
  const term = $("#searchForm-term").val() as string;
  const shows = await searchShowsByTerm(term);

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
    const $episode = $(
      `<li>
         ${episode.name}
         (season ${episode.season}, episode ${episode.number})
       </li>
      `);

    $episodesList.append($episode);
    $episodesArea.show();
  }
}

$showsList.on("click", ".Show-getEpisodes",
  async function (evt: JQuery.ClickEvent): Promise<void> {
    const showId = Number(
      $(evt.target).closest(".Show").data("show-id")
    );
    const episodes = await getEpisodesOfShow(showId);
    populateEpisodes(episodes);
  });
