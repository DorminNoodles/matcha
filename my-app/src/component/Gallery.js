import React from 'react';
import UserProvider from '../context/UserProvider';
import profile from "../image/profile.png"

const AddPicture = ({ sendFile, position }) => (
    <form >
        <input onChange={(e) => sendFile(e, position)} type="file" />
    </form>
);

class Picture extends React.Component {
    state = { modal: false }
    static contextType = UserProvider;

    mouse = (modal) => { this.setState({ modal }) }

    render() {
        let { photo, deletePhoto, position } = this.props
        let { id } = this.context.user
        let imgProfil = id === 0 || !photo ? profile :
            process.env.REACT_APP_PUBLIC_URL + id + "/" + photo.toLowerCase()

        return (
            <figure className="home-upload" >
                <img style={{ objectFit: "contain", width: "100%", height: "100%", position: "absolute" }} src={imgProfil} alt="profil" />
                <div onMouseOver={() => this.mouse(true)} onMouseLeave={() => this.mouse(false)} style={{ position: "absolute", width: "100%", height: "100%" }}>
                    {
                        this.state.modal === true && photo && id &&
                        <div style={{ background: "rgba(10, 10, 10, 0.37)", position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button className="button white-red" onClick={() => deletePhoto(photo, position)}>delete</button>
                        </div>
                    }
                    {!(photo && id) && <AddPicture {...this.props} />}
                </div>
            </figure>
        )
    }
}


const Block = ({ photos, sendFile, deletePhoto }) => {
    return (
        <React.Fragment>
            <div className="bloc-picture">
                <Picture photo={photos[0]} position={1} sendFile={sendFile} deletePhoto={deletePhoto} />
                <Picture photo={photos[1]} position={2} sendFile={sendFile} deletePhoto={deletePhoto} />
            </div>
            <div className="bloc-picture">
                <Picture photo={photos[2]} position={3} sendFile={sendFile} deletePhoto={deletePhoto} />
                <Picture photo={photos[3]} position={4} sendFile={sendFile} deletePhoto={deletePhoto} />
            </div>
        </React.Fragment>
    )
}


class Gallery extends React.Component {
    state = { loading: true }
    static contextType = UserProvider;

    componentWillReceiveProps(next) {
        if (next.photos)
            this.setState({ loading: false })
    }

    render() {
        return (
            <div className="list-picture">
                {this.state.loading === true ? <div>Loading</div> : <Block {...this.props} />}
            </div>
        );
    }
}

export { Gallery };