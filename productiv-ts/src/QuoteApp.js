import React, { useState } from "react";

import QuoteDisplay from "./QuoteDisplay";

/** Component that retrieves and sets an inspirational quote,
 * shown by a child component (QuoteDisplay).
 *
 * Props:
 * - None
 *
 * State:
 * - [quote, setQuote]: the current quote
 *
 * App -> QuoteApp -> QuoteDisplay
 */
function QuoteApp() {
  const [quote, setQuote] = useState(null);

  /** retrieve a random quote from quotes API */
  async function getQuote() {
    const response = await fetch("https://inspo-quotes-api.herokuapp.com/quotes/random")
    const data = await response.json();
    const randomQuote = data.quote;
    setQuote(randomQuote);
  }

  return (
    <QuoteDisplay getQuote={getQuote} quote={quote}/>
  );
}

export default QuoteApp;