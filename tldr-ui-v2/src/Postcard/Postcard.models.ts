export enum FlaskLanguage {
	javascript,
	markup,
	css
}

export enum PostCategory {
	any,
	js,
	html5,
	css,
	scss
}

export class PostContent {
	ContentItemId: string;
	Type: Number | null;
	FlaskLang: FlaskLanguage;
	Lang: Number | null;
	Data: any;
}

export class Post {
	id: string;
	PostId: string;
	Title: string;
	Description: string;
	Category: PostCategory;
	Tags: Array<string>;
	ContentItems: Array<PostContent> = [];
	State: Number;
	CreatedOn: any;
	ModifiedOn: any;
	Upvotes: Number;
	Views: Number;
	IsPublished: Boolean;
	IsSuspended: Boolean;
	Author: { AuthorDocumentId: string, Alias: string, ImgSrc: string };
}