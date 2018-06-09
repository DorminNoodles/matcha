import React from 'react'

class Square extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value: null
		};
	}
	render() {
		return (
			<button className="square" onClick={() => {

				if (this.state.value == 'X')
					this.setState({value: ''})
				else
					this.setState({value: 'X'})
				let foo = "hello"
				console.log(foo);
			}}>
				{this.state.value}
			</button>
		)
	}
}

class Board extends React.Component {
	renderSquare(i) {
		return <Square value={i}/>; // can get var here
	}

	render(){
		const status = 'Next player: X';

		return(
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		)
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* something*/}</div>
					<ol>{/* something*/}</ol>
				</div>
			</div>
		)
	}
}

export default Game;
