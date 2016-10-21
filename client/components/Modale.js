var React = require("react");
var Modal = require('react-modal');



var Modale = React.createClass({

	render: function() {
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
							<p>{this.props.nameWinner}</p>
							<img src={this.props.avatarWinner} className="rounded mx-auto" />
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



module.exports = Modale;

