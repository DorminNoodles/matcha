import React from 'react';
import UserProvider from '../context/UserProvider';
import profile from "../image/profile.png"
import { deletePhoto } from "../function/delete"

class Picture extends React.Component {
    state = { modal: false }
    static contextType = UserProvider;

    mouse = (modal) => { this.setState({ modal }) }

    deletePhoto = () => {
        deletePhoto(this.props.photo, this.context.user.token).then((res) => {
            if (res.status === "success") {
                console.log(res)
            }
        })
    }


    render() {
        let { photo } = this.props
        let { id } = this.context.user
        let imgProfil = id === 0 || !photo ? profile :
            process.env.REACT_APP_PUBLIC_URL + id + "/" + photo

        return (
            <figure className="home-upload" >
                <img style={{ objectFit: "contain", width: "100%", height: "100%", position: "absolute" }}
                    src={imgProfil} alt="profil" />
                <div onMouseOver={() => this.mouse(true)} onMouseLeave={() => this.mouse(false)} style={{ position: "absolute", width: "100%", height: "100%" }}>
                    {
                        this.state.modal === true && photo && id &&
                        <div style={{ background: "rgba(10, 10, 10, 0.37)", position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button className="button white-red" onClick={() => this.deletePhoto()}>delete</button>
                        </div>
                    }
                    {!(photo && id) && <AddPicture {...this.props} />}
                </div>
            </figure>
        )
    }
}

const AddPicture = ({ sendFile, position, upload }) => {
    console.log(sendFile)

    return (
        <React.Fragment>

            <form style={{ background: "rgba(10, 10, 10, 0.37)", position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} encType="multipart/form-data">
                <input style={{ width: "100%", height: "100%" }}
                    onChange={(e) => sendFile(e, position)}
                    name="avatar"
                    placeholder="Choose avatar"
                    type="file"
                />
            </form>
            <button onClick={upload}>upload</button>
        </React.Fragment>
    )
}


const Block = ({ list, photos, sendFile, upload }) => {
    return (
        <React.Fragment>

            <div className="bloc-picture">
                <Picture photo={list[photos[0]]} position={1} sendFile={sendFile} upload={upload} />
                <Picture photo={list[photos[1]]} position={2} sendFile={sendFile} upload={upload} />
            </div>
            <div className="bloc-picture">
                <Picture photo={list[photos[2]]} position={3} sendFile={sendFile} upload={upload} />
                <Picture photo={list[photos[3]]} position={4} sendFile={sendFile} upload={upload} />
            </div>
        </React.Fragment>
    )
}


class Gallery extends React.Component {
    state = { loading: true }
    static contextType = UserProvider;

    componentWillReceiveProps(next) {
        if (next.list && next.photos)
            this.setState({ loading: false })
    }

    render() {
        return (
            <div className="list-picture">
                {
                    this.state.loading === true ?
                        <div>Loading</div> : <Block {...this.props} />
                }
            </div>
        );
    }
}

export { Gallery };