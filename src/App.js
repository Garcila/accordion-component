import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			idCounter: 4,
			items: [
				{
					id: 1,
					view: true,
					icon: '\u{1F30A}',
					text: `Information is a lot like water; it's hard to hold on to, and hard to keep from leaking away.
						― Ruth Ozeki, A Tale for the Time Being`
				},
				{
					id: 2,
					view: true,
					icon: '\u{1F50D}',
					text: `I believe it doesn't matter what it is, as long as you can find something concrete to keep you busy while you are living your meaningless life.” 
					― Ruth Ozeki, A Tale for the Time Being`
				},
				{
					id: 3,
					view: true,
					icon: '\u{23F2}',
					text: `The past is weird. I mean, does it really exist ? It feels like it exists, but where is it ? And if it did exists, but doesn’t now, then where did it go ?
					― Ruth Ozeki, A Tale for the Time Being`
				},
				{
					id: 4,
					view: true,
					icon: '\u{1F480}',
					text: `Where do words come from? They come from the dead. We inherit them. Borrow them. Use them for a time to bring the dead to life.
					― Ruth Ozeki, A Tale for the Time Being`
				}
			]
		};

		this.toggle = this.toggle.bind(this);
		this.addToList = this.addToList.bind(this);
	}

	toggle(id) {
		let items = [...this.state.items];
		items.map(item => (item.id === id ? (item.view = !item.view) : ''));
		this.setState({ items });
	}

	addToList(sentence) {
		const id = this.state.idCounter + 1;
		const newItem = {
			id,
			view: true,
			text: sentence.text,
			icon: `\u{1f43d}`
		};
		const items = [...this.state.items, newItem];
		this.setState({ idCounter: id });
		this.setState({ items });
	}

	render() {
		const listItem = this.state.items.map(t => (
			<li key={t.id} className="list-item">
				{console.log(t.icon)}
				<span className="horsie" onClick={() => this.toggle(t.id)}>
					<span role="img" aria-label="unicorn-handPointing">
						{t.view ? `${t.icon} \u{1f448}` : `${t.icon} \u{1F449}`}
					</span>
				</span>
				{t.view ? <span className="sentence">{t.text}</span> : ''}
			</li>
		));
		return (
			<div className="App">
				<AddText addToList={this.addToList} />
				<ul>{listItem}</ul>
			</div>
		);
	}
}

class AddText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			emoji: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.submitChange = this.submitChange.bind(this);
	}
	handleChange(e) {
		const text = e.target.value;
		this.setState({ text });
	}

	submitChange(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.props.addToList(this.state);
			this.setState({ text: '' });
		}
	}

	render() {
		return (
			<form onSubmit={this.submitChange}>
				<textarea
					className="input-text"
					onChange={this.handleChange}
					onKeyPress={this.submitChange}
					value={this.state.text}
					placeholder="Enter new enlightened sentence"
				/>
			</form>
		);
	}
}

export default App;
