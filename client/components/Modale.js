var React = require("react");
var Modal = require('react-modal');
var connect = require("react-redux").connect;
var store = require("../redux/store");
var actions = require("../redux/action");

var winnerCharater = {};
var Modale = React.createClass({

	render: function() {
		function test(data) {
			for(var i = 0; i < data.length; i++) {
				for(var j = 0; j < data.length; j++) {
					if (data[i].weapon === data[j].weakness) {
						// console.log("strong", this.props.data[i]);
						winnerCharater = data[i];
					}
				// else if (this.props.data[j].weapon === this.props.data[i].weakness) {
				// 	console.log("strong", this.props.data[j]);
				// }
				}
	
			};
			console.log(winnerCharater);
			return winnerCharater;
		};

		var result = test(this.props.data);
		console.log(result);
		return (
		<div>
			<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
			        <h4 className="modal-title" id="myModalLabel">Check Winner</h4>
			      </div>
			      <div className="modal-body">
			        <div className="text-xs-center imageDiv">
  						<img src="https://media.giphy.com/media/ihBlIrHsghO8g/giphy.gif" className="rounded image" />
					</div>
					<div className="text-xs-center imageDiv">
						<h3 style={{color: "red"}}>The Winner is: </h3>
							<p>{result.name}</p>
							<img src={result.avatar} className="Thumbnail mx-auto" />
					</div>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
			      </div>
			    </div>
			  </div>
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

var Container = connect(mapStateToProps)(Modale)

module.exports = Container;

