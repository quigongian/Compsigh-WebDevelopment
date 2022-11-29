import { Header } from "../components/header";
import women from "../image_content/women.svg";
import idea_search from "../image_content/idea_search.svg";
import clock_calender from "../image_content/clock_calender.svg";
import "./home.css";
import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <>
      <Header />

      <div className="temp">
        <div className="All">
          <div className="Sect1">
            <h1 className="header"> Welcome to CompSigh</h1>
            <p className="mainpg">CompSigh is a website applicatoin dedicated in 
            helping students organize their tasks and achieve their goals. The website 
            is primarily targeted at Computer Science students but it is welcomed to all. CompSigh 
            hopes to improve productivity levels and lead to success in desired careers.</p>
            
            <Link to="/login">
            <button className="main-btn">Get Started</button>
            </Link>
           


          </div>

          <div className="Sect2">
            <h2>One less thing to worry about</h2>
            <div className="row">

              <p className="column">
                <img src={women} alt="woman thinking" />
                <br />
                Breaking down complex tasks <br />into smaller ones by using Pomodoro
              </p>

              <p className="column">
                <img src={idea_search} alt="ladder up the books" height={"203px"} width={"219px"} />
                <br />
                Guiding you through your goals <br />so that you can have peace of mind
              </p>

              <p className="column">
                <img src={clock_calender} alt="clock and calender" />
                <br />
                All your goals put into one <br /> productive website
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
