import * as React from 'react';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
