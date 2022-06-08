import React from 'react';
import ReactDOM from 'react-dom/client';

import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list : [],
			backup : [],
		};  
	}

	componentDidMount(){
		const myList = [
			{
				'artist' : 'Johannes',
				'date' : '2020',
				'link' : 'oo===D',
				'tag' : 'a'
			},
			{
				'artist' : 'Alex',
				'date' : '1822',	
				'link' : 'RAWR',
				'tag' : 'a',
			},
			{
				'artist' : 'Peter',
				'date' : '2022',	
				'link' : 'RAWR',
				'tag' : 'b',
			}
		];
		this.setState(
			{
				'list' : myList,
				'backup' : myList
			}
		);
	}

	getBackup = () => {
		const backupList = this.state.backup;
		console.log(backupList);
		this.setState(
			{
				'list' : backupList,
			}
		);
	}

	sortByDate_click = async (event) => {
		await this.getBackup();
		let sorting = this.state.list;

		if(event.target.className == 'asc'){
			sorting.sort(function(a,b){
			  // Turn your strings into dates, and then subtract them
			  // to get a value that is either negative, positive, or zero.
			  return new Date(a.date) - new Date(b.date);
			});
			event.target.className = 'desc';
		}else{
			sorting.sort(function(a,b){
			  // Turn your strings into dates, and then subtract them
			  // to get a value that is either negative, positive, or zero.
			  return new Date(b.date) - new Date(a.date);
			});
			event.target.className = 'asc';
		}

		this.setState(
			{
				'list' : sorting
			}
		);
	}
	sortByName_click = async(event) => {
		await this.getBackup();
		let sorting = this.state.list;
		if(event.target.className == 'asc'){
			sorting.sort(
				(a,b) => {
					var nameA = a.artist.toUpperCase(); // Groß-/Kleinschreibung ignorieren
					var nameB = b.artist.toUpperCase(); // Groß-/Kleinschreibung ignorieren
					if (nameA < nameB) {
					  return -1;
					}
					if (nameA > nameB) {
					  return 1;
					}

					// Namen müssen gleich sein
					return 0;
				}
			);
			event.target.className = 'desc';
		}else{
			sorting.sort(
				(a,b) => {
					var nameA = a.artist.toUpperCase(); // Groß-/Kleinschreibung ignorieren
					var nameB = b.artist.toUpperCase(); // Groß-/Kleinschreibung ignorieren
					if (nameA > nameB) {
					  return -1;
					}
					if (nameA < nameB) {
					  return 1;
					}

					// Namen müssen gleich sein
					return 0;
				}
			);
			event.target.className = 'asc';
		}

		this.setState(
			{
				'list' : sorting
			}
		);
	}

	filterByTag_click = async (event) => {
		await this.getBackup();
		console.log(event.target.classList.length);
		let filtered = false;

		if(event.target.classList.length != 0){
			event.target.classList.forEach(
				(item) => {
					if(item == 'filtered'){
						filtered = true;
						event.target.classList.remove('filtered');
					}
				}
			);			
		}

		if(filtered == false){
			const tag = event.target.id;
			let list = this.state.list;
			let list2 = [];
			list.forEach(
				(item) => {
					if(item.tag == tag){
						list2.push(item);
					}
				}
			);
			event.target.classList.add('filtered');
			this.setState(
				{
					'list' : list2
				}
			);
		}
	}

	render() {
		return (
			<>
			<div>
				<div onClick={this.sortByDate_click} className='asc'>Datum</div>
				<div onClick={this.sortByName_click} className='asc'>Name</div>
				<div onClick={this.filterByTag_click} className='' id='a'>Tag A</div>
				<div onClick={this.filterByTag_click} className='' id='b'>Tag B</div>
			</div>
			{
				this.state.list.map(
				(item,index) =>
					<ul key={index}>
						<li>
							artist: 
							{item.artist}
						</li>
						<li>
							date:
							{item.date}
						</li>
						<li>
							<a href="{item.link}">
								{item.link}
							</a>
						</li>
						<br/>
					</ul>
				)
			}
			</>
		);
	}
}

export default App;