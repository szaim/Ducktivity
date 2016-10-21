var React = require("react");
var connect = require("react-redux").connect;
var store = require("../redux/store");
var actions = require("../redux/action");
var Character = require("../components/Character");
var Modale = require("../components/Modale");
var Modal = require('react-modal');
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var update = require('react-addons-update');


// var winnerCharater = {};
// var looserCharacter = {};
var listCharacters = {};
var result;
// Returns a random integer between min (included) and max (included)

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };
var BattleContainer = React.createClass({
	componentDidAmount: function() {
		this.props.dispatch(actions.fetchData());
	},
	getInitialState: function() {
		return {
		val: 'false'
		}
	},
	changeState: function() {
			if (result.winnerCharater) {
				result.winnerCharater.percent = parseInt((Math.random() * 41 + 60), 10);
				result.winnerCharater.color = '#85D262';
				result.looserCharacter.percent = parseInt((Math.random() * 21 + 30), 10);
				result.looserCharacter.color = '#FE8C6A';

			}

			this.setState({
				val: 'true'
			});
			console.log("perc winner", result.winnerCharater.percent);
	


		// console.log(this.state.percent);
		console.log(result);
	},

	render: function() {
		function test(data) {
			for(var i = 0; i < data.length; i++) {
				for(var j = 0; j < data.length; j++) {
					if (data[i].weapon === data[j].weakness) {
						// console.log("strong", this.props.data[i]);
						var winnerCharater = data[i];
						var looserCharacter = data[j];
					}
				// else if (this.props.data[j].weapon === this.props.data[i].weakness) {
				// 	console.log("strong", this.props.data[j]);
				// }
				}
	
			};
			console.log(winnerCharater);
			console.log("looserrrrr", looserCharacter);
			listCharacters = {winnerCharater, looserCharacter}
			return listCharacters;
			// return looserCharacter;
		};

		result = test(this.props.data);
		console.log("resssult", result);		
		return (
			<div>
				<img src="http://www.sprites-inc.co.uk/files/Classic/Titles/PowerB.png" className=" rounded mx-auto d-block imgTitle"/>
			<div className="container">
				<div className="leftComponent">
					<Character 
						name={result.winnerCharater.name} 
						img={result.winnerCharater.sprite1}
						weapon={result.winnerCharater.weapon}
						weakness={result.winnerCharater.weakness}
						percent={result.winnerCharater.percent}
						strokeColor={result.winnerCharater.color} />
				</div>
				<div className="rightComponent">
					<Character 
						name={result.looserCharacter.name} 
						img={result.looserCharacter.sprite1}
						weapon={result.looserCharacter.weapon}
						weakness={result.looserCharacter.weakness}
						percent={result.looserCharacter.percent}
						strokeColor={result.looserCharacter.color} />						
				</div>
				<div className="form-group col-sm-12 col-sm-offset-12 formButton text-xs-center">
			
					<button type="button" onClick={this.changeState} value={this.state.val} className="btn btn-success text-xs-center button" data-toggle="modal" data-target="#myModal">
						MegaMan Fight
					</button><img src="https://media.giphy.com/media/anroh2VdfWXhS/giphy.gif" className="rounded buttonImg" />
			
				</div>
				<div className="form-group col-sm-12 col-sm-offset-12 restartButton text-xs-center">
					<form>
					<Link to='/'>
						<button type="submit" className="btn btn-danger text-xs-center">
							Restart The Game
						</button>
					</Link>
					</form>
				</div>
				<img src="http://www.gamedynamo.com/images/galleries/photo/1922/mega-man-powered-up.jpg" className="rightImage" />
				<img src="https://s-media-cache-ak0.pinimg.com/originals/4c/fe/c9/4cfec9a46dc913ab334feb99c683aba3.jpg" className="leftImage" />
			
				<Modale nameWinner={result.winnerCharater.name} avatarWinner={result.winnerCharater.avatar}/>

			</div>
		</div>

		)
	}
});

var mapStateToProps = function(state, props) {
	return {
		data: state.characters
	}
};

var Container = connect(mapStateToProps)(BattleContainer)

module.exports = Container;