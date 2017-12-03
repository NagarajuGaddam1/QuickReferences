import * as React from 'react';
import { Post, PostContent, FlaskLanguage, PostCategory } from './Postcard.models';

const jsLogo = 'images/js.png';
const htmlLogo = 'images/html5.png';
const cssLogo = 'images/css3.png';
const scssLogo = 'images/scss.png';

interface OwnProps {
	post: Post;
}

interface OwnState { }

export class Postcard extends React.Component<OwnProps, OwnState> {
	state: Post;
	constructor(props: any) {
		super(props);
	}
	render() {
		const { post } = this.props;
		const contentCollection = post.ContentItems.map((content: PostContent, index: number) => {
			const flaskLanguage = content.FlaskLang !== null ? 'language-' + FlaskLanguage[content.FlaskLang] : '';
			return (
				<div className="Postcard-Content-Item" key={index}>
					{
						content.Type === 1 &&
						<pre><code className={flaskLanguage}>{content.Data}</code></pre>
					}
					{
						content.Type === 0 &&
						<p className="Postcard-Content-Item-Text">{content.Data}</p>
					}
				</div>
			);
		});
		const tags = post.Tags.map((tag: string, index: number) => {
			return <label className="Postcard-Tag" key={index}>{tag}</label>;
		});
		let postType = '';
		let postLogo = '';
		switch (post.Category) {
			case PostCategory.any:
			case PostCategory.js: postType = 'JavaScript'; postLogo = jsLogo; break;
			case PostCategory.css: postType = 'CSS'; postLogo = cssLogo; break;
			case PostCategory.html5: postType = 'HTML5'; postLogo = htmlLogo; break;
			case PostCategory.scss: postType = 'SCSS'; postLogo = scssLogo; break;
			default: break;
		}
		return (
			<div className={"Postcard " + postType} id={post.id}>
				<div className="Postcard-Header">
					<img className="Postcard-Header-Logo" src={postLogo} />
					<h5 className="Postcard-Header-Type">{postType}</h5>
					<br />
					<h5 className="Postcard-Header-Meta">Posted by <a href="#" className="Postcard-Header-Meta-User">asitparida</a> | Last modified on July 18, 2017 5:17 P.M.</h5>
					<div className="Postcard-Tag-Container">
						Tags  {tags.length > 0 && tags}
					</div>
				</div>
				<div className="Postcard-Content">
					<h3>{post.Title}</h3>
					{contentCollection.length > 0 && contentCollection}
				</div>
			</div>
		);
	}
}
