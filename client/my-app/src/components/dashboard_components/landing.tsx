import quotationMarks from "../../image_content/quotationMarks.svg";
import quotesBG from "../../image_content/quotesBG.svg";
import "./landing.css";

export const Landing = () => {
  return (
    <div>
      <Quotes />
    </div>
  );
};

export const Quotes = () => {
  return (
    <div className="quotes">
      <img className="quotationMarks" src={quotationMarks} alt="quotationMarks" />
      <img className="quotesBG" src={quotesBG} alt="quotationMarks" />
      <div className="rndQuotes">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        <div className="creditsContainer">
          <span className="quotesCredits">-Lorem Ipsum</span>
        </div>
      </div>
    </div>
  );
};
