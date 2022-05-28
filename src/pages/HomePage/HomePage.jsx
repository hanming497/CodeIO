import React from "react";
import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import MainButton from "../../components/MainButton/MainButton";
import TextContent from "../../components/TextContent/TextContent";
import "./HomePage.css";
import userService from "../../utils/userService";
const HomePage = (props) => {
	return (
		<div className="HomePage">
			<NavBar user={props.user} handleLogout={props.handleLogout} />
			<div class="flexBody">
				<TextContent
					class="boxItem"
					name={props.user ? "Insert Function" : "ES 6 Function"}
					value={props.es6}
					onChange={props.onChange}
				></TextContent>
				<div class="flexButtons">
					<MainButton
						name="Convert"
						clicked={props.convert}
						disabled={props.disabled}
					></MainButton>
					<MainButton
						name="Explain"
						disabled={props.user ? false : true}
						clicked={props.explain}
					></MainButton>
					<MainButton
						name="Calculate Time Complexity"
						disabled={props.user ? false : true}
						clicked={props.getTimeComplexity}
					></MainButton>
				</div>

				<TextContent
					class="boxItem"
					name={props.user ? "Output" : "ES 5 Function"}
					value={props.es5}
					onChange={null}
				></TextContent>
			</div>
		</div>
	);
};

export default HomePage;

{
	/* <div className="flex-h align-flex-end">
        <GameBoard
          colors={props.colors}
          guesses={props.guesses}
          handlePegClick={props.handlePegClick}
          handleScoreClick={props.handleScoreClick}
        />
        <div className='GamePage-controls'>
          <ColorPicker
            colors={props.colors}
            selColorIdx={props.selColorIdx}
            handleColorSelection={props.handleColorSelection}
          />
          <GameTimer
            elapsedTime={props.elapsedTime}
            handleTimerUpdate={props.handleTimerUpdate}
            isTiming={props.isTiming}
          />
          { props.user && <Link className='btn btn-default GamePage-link-margin' to='/high-scores'>High Scores</Link>}
          <Link className='btn btn-default GamePage-link-margin' to='/settings'>Difficulty</Link>
          <NewGameButton handleNewGameClick={props.handleNewGameClick}/>
        </div>
      </div>
      <footer className='header-footer'>
        {(props.winTries ? `You Won in ${props.winTries} Guesses!` : 'Good Luck!')}
      </footer> */
}
