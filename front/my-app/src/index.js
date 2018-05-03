import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import TopMenu from './navbar';
import Signup from './signup';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={props.onClick}>
//     	{props.value}
//       </button>
//     );
//   }
// }
//
// function Square(props) {
// 	return (
// 		<button className="square" onClick={props.onClick}>
// 	  	{props.value}
// 		</button>
// 	);
// }
//
//   render() {
// 	  return (
// 			<div>
// 				<div className="board-row">
// 					{this.renderSquare(0)}
// 					{this.renderSquare(1)}
// 					{this.renderSquare(2)}
// 				</div>
// 				<div className="board-row">
// 					{this.renderSquare(3)}
// 					{this.renderSquare(4)}
// 					{this.renderSquare(5)}
// 				</div>
// 				<div className="board-row">
// 					{this.renderSquare(6)}
// 					{this.renderSquare(7)}
// 					{this.renderSquare(8)}
// 				</div>
// 			</div>
// 		);
// 	}
// }
//
// class Game extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			history: [{
// 				squares: Array(9).fill(null),
// 			}],
// 			xIsNext: true
// 		};
// 	}
//
// 	handleClick(i) {
// 		const history = this.state.history;
// 		const current = history[history.length - 1];
// 		const squares = current.squares.slice();
// 		if (calculateWinner(squares) || squares[i]) {
// 			return;
// 		}
// 		squares[i] = this.state.xIsNext ? 'X' : '0';
// 		this.setState({
// 			history: history.concat([{
// 				squares: squares
// 			}]),
// 			xIsNext: !this.state.xIsNext,
// 		});
// 	}
//
//   render() {
// 	  const history = this.state.history;
// 	  const current = history[history.length - 1];
// 	  const winner = calculateWinner(current.squares);
//
// 	  const moves = history.map((step, move) => {
//       	const desc = move ?
//         	'Go to move #' + move :
//         	'Go to game start';
//      	return (
// 			<li>
// 				<button onClick={() => this.jumpTo(move)}>{desc}</button>
// 			</li>
// 	      );
// 		});
//
// 	  let status;
// 	  if (winner) {
// 		  status = 'Winner: ' + winner;
// 	  } else {
// 		  status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
// 	  }
//
// 	  return (
// 		  <div className="game">
// 		  	<div className="game-board">
// 			<Board
// 				squares={current.squares}
// 				onClick={(i) => this.handleClick(i)}
// 			/>
// 			</div>
// 			<div className="game-info">
// 				<div>{status}</div>
//   				<ol>{moves}</ol>
// 			</div>
// 		</div>
//     );
//   }
// }
//
// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

// export default (props) => {
//   return (
//     <Button color="danger">Danger!</Button>
//   );
// };

class Square extends React.Component {
	render()
	{
		return (
			<h1>
				Square
			</h1>
		);
	}
}

class Lastname extends React.Component {
	render()
	{
		return (
			<label>
				Lastname:
				<input type="text" name="lastname" />
			</label>
		);
	}
}

class Mail extends React.Component {
	render()
	{
		return (
			<label>
				Mail:
				<input type="text" name="mail" />
				</label>
		);
	}
}

class Password extends React.Component {
	render()
	{
		return (
			<label>
				Password:
				<input type="text" name="password" />
				</label>
		);
	}
}

class Username extends React.Component {
	render()
	{
		return (
			<label>
				Username:
				<input type="text" name="username" />
			</label>
		);
	}
}

// class Signup extends React.Component {
// 	render()
// 	{
// 		return (
// 			<form>
// 				<Username salut='toto'/>
// 				<br />
// 				<Lastname />
// 				<br />
// 				<Password />
// 				<br />
// 				<Mail />
// 				<br />
// 				<input type="submit" value="Submit" />
// 			</form>
// 		);
// 	}
// }

class Menu extends React.Component {
	// render()
	// {
	// 	<div class="">
	// 	<div>
	// }
}

class Main extends React.Component {
	render()
	{
		return (
			<div>
				<TopMenu />
				<div className="signup">
					<Signup />
				</div>
			</div>
		);
	}
}




// ========================================

ReactDOM.render(
	<Main />,
  document.getElementById('root')
);
