import * as React from 'react';
import './PlaylistVertical.component.css';
import { Post, PostCategory } from '../Postcard/Postcard.models';

const jsLogo = require('../images/js.png');
const htmlLogo = require('../images/html5.png');
const cssLogo = require('../images/css3.png');
const scssLogo = require('../images/scss.png');

interface OwnProps {
	posts: Array<any>;
	activeIndex: number;
}

interface OwnState { }

export class PlaylistVertical extends React.Component<OwnProps, OwnState> {
	state: Post;
	constructor(props: any) {
		super(props);
	}
	render() {
		const { posts, activeIndex } = this.props;
		const postsCollection = posts.map((post: Post, index: number) => {
			let postLogo = '';
			switch (post.Category) {
				case PostCategory.any:
				case PostCategory.js: postLogo = jsLogo; break;
				case PostCategory.css: postLogo = cssLogo; break;
				case PostCategory.html5: postLogo = htmlLogo; break;
				case PostCategory.scss: postLogo = scssLogo; break;
				default: break;
			}
			const activeClass = activeIndex === index ? ' active' : '';
			return (
				<div key={index} className={"PlaylistVertical-Item " + activeClass}>
					<img className="PlaylistVertical-Item-Logo" src={postLogo} />
					<label className="PlaylistVertical-Item-Title">{post.Title}</label>
					<div className="arrow-left" />
				</div>
			);
		});
		return (
			<div className="PlaylistVertical">
				{postsCollection}
			</div>
		);
	}
}
