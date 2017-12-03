import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Postcard } from './Postcard.component';
import { PlaylistPan } from './PlaylistPan.component';
import { SAMPLES as Posts } from './samples';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        const PostCollection = Posts.map((post: any, index: number) => {
            return <Postcard key={index} post={post} />;
        });
        return (
            <div className="App">
                {<PlaylistPan posts={Posts} activeIndex={10} title={'Sorting in JavaScript'} />}
                <div className="PostsHolder" >
                    {PostCollection}
                </div>
            </div>
        );
    }
}
