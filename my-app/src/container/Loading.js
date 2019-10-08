import React from 'react';
import { PropagateLoader } from 'react-spinners';

class Loading extends React.Component {

    render() {
        const override = `display: flex;justify-content: center; height: 100%; align-items: center;`;

        return (
            <div className='sweet-loading'>
                <PropagateLoader
                    css={override}
                    sizeUnit={"px"}
                    size={15}
                    color={'white'}
                    loading
                />
            </div>
        )
    }
}

export default Loading;