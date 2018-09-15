import React, { Component } from 'react';
import Card from '../Card';
import images from "../../doggos.json";


class Logic extends Component {
	
	state = {
		images,
		message: "",
		score: 0,
		topScore: 0
	};
	
	randomize = (a, b) => Math.random() > .5 ? -1 : 1


	clickHandler = (id, clicked) => {

		let dogs = this.state.images;

		if (clicked) {
			dogs.forEach((image, index) => {
				dogs[index].clicked = false;
			});
			return this.setState({
				image: dogs.sort(this.randomize),
				message: "WRONG! GAME OVER",
				score: 0
			})
		}
		else {
			dogs.forEach((image, index) => {
				if (id === image.id) {
					dogs[index].clicked = true;
				}
			});

			const { topScore, score } = this.state;
			const newScore = score + 1;
			const newTopScore = newScore > topScore ? newScore : topScore;

			return this.setState({
				image: dogs.sort(this.randomize),
				message: "Correct",
				score: newScore,
				topScore: newTopScore,
			})
		}
	};

	render() {
		return (
			<div className="wrapper">
			<div className="message text-center">
						<p>{this.state.message}</p>
					</div>
					<div className="topscore text-center">
						<p>Top Score: {this.state.topScore}</p>
					</div>
					<div className="score text-center">
						<p>Score: {this.state.score}</p>
					</div>
				<div className="container">
					
					<div className="row">
					{this.state.images.map(doggo => (
						<Card
							id={doggo.id}
							name={doggo.name}
							clicked={doggo.clicked}
							image={doggo.image}
							clickHandler={this.clickHandler}
							/>
					))}
					</div>
					
				</div>
			</div>
		);
	}
};

export default Logic;