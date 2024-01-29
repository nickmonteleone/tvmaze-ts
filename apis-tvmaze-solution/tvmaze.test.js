"use strict";


// almost-"unit tests" (they call AJAX, because fetch isn't `mocked`. We will
// explore mocking later.)

describe("getShowsByTerm", function () {
  it("should successfully search", async function () {
    const shows = await getShowsByTerm("bletchley");
    const ids = shows.map(s => s.id);
    expect(ids).toEqual([1767, 37008]);
  });

  it("should return nothing for bad search", async function () {
    const shows = await getShowsByTerm("squeamish ossifrage");
    expect(shows).toEqual([]);
  });
});

describe("getEpisodesOfShow", function () {

  it("should successfully search", async function () {
    const episodes = await getEpisodesOfShow(1767);
    expect(episodes.length).toEqual(7);
  });
});

// to handle testing the actual UI

describe("search form submission", function () {

  it("should search", async function () {
    // see if our search function is called when the button is clicked
    spyOn(window, "searchShowsAndDisplay");

    // make a real click in the browser
    $("#searchForm-term").val("bletchley");
    $searchForm.trigger("submit");

    // make sure it got called
    expect(searchShowsAndDisplay).toHaveBeenCalledTimes(1);
  });
})

