import * as React from 'react';
import './App.css';
import { Postcard } from './Postcard/Postcard.component';
// import { PlaylistVertical } from './PlaylistVertical/PlaylistVertical.component';
import { SAMPLES as Posts } from './samples';

class App extends React.Component {
	render() {
		const PostCollection = Posts.map((post: any, index: number) => {
			return <Postcard key={index} post={post} />;
		});
		return (
			<div className="App">
				{/* <PlaylistVertical posts={Posts} activeIndex={10} /> */}
				<div style={{ width: 'calc(100vw)', float: 'right'}}>
					{PostCollection}
				</div>
			</div>
		);
	}
}

export default App;
