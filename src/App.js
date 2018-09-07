import React, { Component } from 'react';
import './App.css';
import EmojiPicker from 'emoji-picker-react';
import uniqid from 'uniqid';

import fire from './fire.js';
const firestore = fire.firestore();

firestore.settings({
	timestampsInSnapshots: true
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: []
		};

		this.toggle = this.toggle.bind(this);
		this.addToList = this.addToList.bind(this);
	}

	componentDidMount() {
		fire
			.firestore()
			.collection('items')
			.onSnapshot(collection =>
				this.setState({
					items: collection.docs.map(doc => doc.data())
				})
			);
	}

	toggle(id) {
		let items = [...this.state.items];
		items.map(item => (item.id === id ? (item.view = !item.view) : ''));
		this.setState({ items });
	}

	addToList(sentence) {
		const id = uniqid();
		fire
			.firestore()
			.collection('items')
			.add({
				id,
				view: true,
				text: sentence.text,
				icon: sentence.icon
			});

		const newItem = {
			id,
			view: true,
			text: sentence.text,
			icon: sentence.icon
		};

		const items = [...this.state.items, newItem];
		this.setState({ items });
	}

	render() {
		const listItem =
			this.state.items &&
			this.state.items.map(t => (
				<li key={t.id} className="list-item">
					<span className="horsie" onClick={() => this.toggle(t.id)}>
						<span role="img" aria-label="unicorn-handPointing">
							{t.view
								? `${t.icon} \u{1f448}`
								: `${t.icon} \u{1F449}`}
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
			icon: '',
			ep: false
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

	togglePicker = e => {
		e.preventDefault();
		this.setState((state, props) => ({
			ep: !state.ep
		}));
	};

	render() {
		return (
			<form className="get-sentence-form" onSubmit={this.submitChange}>
				<button
					className="toggle-emoji-picker"
					onClick={this.togglePicker}
					style={
						this.state.icon
							? { fontSize: '2rem' }
							: { fontSize: '1rem' }
					}
				>
					{this.state.icon || '+ Emoji'}
				</button>
				{this.state.ep ? (
					<EmojiPicker
						className="emoji-picker"
						onEmojiClick={emoji => {
							const icon = String.fromCodePoint(
								parseInt(emoji, 16)
							);
							this.setState({ icon, ep: false });
						}}
					/>
				) : null}
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
