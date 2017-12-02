import * as React from 'react';
import './PlaylistPan.component.css';
import { Post, PostCategory } from '../Postcard/Postcard.models';

const jsLogo = require('../images/js.png');
const htmlLogo = require('../images/html5.png');
const cssLogo = require('../images/css3.png');
const scssLogo = require('../images/scss.png');

interface OwnProps {
	posts: Array<any>;
	activeIndex: number;
	title: string;
}

interface OwnState { }

export class PlaylistPan extends React.Component<OwnProps, OwnState> {
	state: Post;
	constructor(props: any) {
		super(props);
	}
	handleClick(index: number) {
		this.props.posts.forEach((post: Post, i: number) => {
			if (i !== index) {
				post.active = false;
			} else {
				post.active = true;
			}
		});
		this.forceUpdate();
	}
	markAsActive(id: string) {
		this.props.posts.forEach((post: Post, i: number) => {
			if (post.id !== id) {
				post.active = false;
			} else {
				post.active = true;
			}
		});
		this.forceUpdate();
	}
	componentDidMount() {
		const self = this;
		let lastKnownScrollPosition = 0;
		let ticking1 = false;
		let ticking2 = false;
		let stickyHeader = true;
		let init = false;
		const holder: Element | null = document.querySelector('.PostsHolder');
		const onScroll = function() {
			if (init) {
				if (window.scrollY > lastKnownScrollPosition) {
					if (stickyHeader) {
						if (holder) {
							const props: ClientRect  = holder.getBoundingClientRect();
							if (props && props.top && props.top < 0) {
								const elem = document.querySelector('[data-tag="pannable-playlist"]');
								if (elem) {
									elem.classList.add('non-sticky');
								}
								stickyHeader = false;
							}
						}

					}
				} else {
					if (!stickyHeader) {
						const elem = document.querySelector('[data-tag="pannable-playlist"]');
						if (elem) {
							elem.classList.remove('non-sticky');
						}
						stickyHeader = true;
					}
				}
			}
			init = true;
			lastKnownScrollPosition = window.scrollY;
		};
		document.addEventListener('scroll', (e: Event) => {
			if (!ticking1) {
				window.requestAnimationFrame(function () {
					onScroll();
					ticking1 = false;
				});
				ticking1 = true;
			}
		});
		let activeElemId: string | null = null;
		const onScrollForItems = function() {
			const items  = document.querySelectorAll('.Postcard');
			if (items && items.length > 0) {
				let tryBreak = false;
				for (let i = 0; i < items.length; i++) {
					const props: any = (items[i] as Element).getBoundingClientRect();
					if (props && props.y) {
						if (props.y > 0 && props.y < (window.innerHeight / 2)) {
							if (items[i].id !== activeElemId) {
								activeElemId = items[i].id;
								self.markAsActive(activeElemId);
							}
							tryBreak = true;
						}
					}
					if (tryBreak) {
						break;
					}
				}
			}
		};
		document.addEventListener('scroll', (e: Event) => {
			if (!ticking2) {
				window.requestAnimationFrame(function () {
					onScrollForItems();
					ticking2 = false;
				});
				ticking2 = true;
			}
		});
	}
	render() {
		const { posts, title } = this.props;
		// posts[0].active = true;
		const postsCollection = posts.map((post: Post, index: number) => {
			let postLogo = '';
			let postType = '';
			switch (post.Category) {
				case PostCategory.any:
				case PostCategory.js: postType = ' JavaScript'; postLogo = jsLogo; break;
				case PostCategory.css: postType = ' CSS'; postLogo = cssLogo; break;
				case PostCategory.html5: postType = ' HTML5'; postLogo = htmlLogo; break;
				case PostCategory.scss: postType = ' SCSS'; postLogo = scssLogo; break;
				default: break;
			}
			const activeClass = post.active ? ' active ' : '';
			const tags = post.Tags.map((tag: string, i: number) => {
				return <label className="Postcard-Tag" key={i}>{tag}</label>;
			});
			return (
				<div key={index} className={"PlaylistPan-Item " + activeClass + postType} onClick={() => this.handleClick(index)} data-target={post.id}>
					<img className="PlaylistPan-Item-Logo" src={postLogo} />
					{tags.length > 0 && tags}
					<label className="PlaylistPan-Item-Title">{post.Title}</label>
				</div>
			);
		});
		const itemsLengthMarkup = posts.length > 0 ? `(${posts.length})` : '';
		return (
			<div className="PlaylistPan" data-tag="pannable-playlist">
				<label className="title">{title} {itemsLengthMarkup}</label>
				<div className="PlaylistPan-Chevron Left">
					<i className="ms-Icon ms-Icon--ChevronLeftMed" aria-hidden="true" />
				</div>
				<div className="PlaylistPan-Holder">
					{postsCollection}
				</div>
				<div className="PlaylistPan-Chevron Right">
					<i className="ms-Icon ms-Icon--ChevronRightMed" aria-hidden="true" />
				</div>
			</div>
		);
	}
}
