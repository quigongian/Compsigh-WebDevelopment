import quotationMarks from "../../image_content/quotationMarks.svg";
import quotesBG from "../../image_content/quotesBG.svg";
import "./landing.css";
import quotesJSON from "./quotes.json";

export const Landing = () => {
  return (
    <div>
      <Quotes />
    </div>
  );
};

export const Quotes = () => {
  const num = Math.floor(Math.random() * quotesJSON.quotes.length);
  return (
    <div className="quotes">
      <img className="quotationMarks" src={quotationMarks} alt="quotationMarks" />
      <img className="quotesBG" src={quotesBG} alt="quotationMarks" />
      <div className="rndQuotes">{quotesJSON.quotes[num].quote}</div>
      <div className="creditsContainer">
        <div className="quotesCredits">- {quotesJSON.quotes[num].author}</div>
      </div>
    </div>
  );
};
