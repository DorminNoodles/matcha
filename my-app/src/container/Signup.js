import React from 'react';
import { check } from "../function/signup.js"
import { ProfileImg, FirstPage, SecondPage, ThirdPage } from "../component/Signup.js"
import UserProvider from '../context/UserProvider';
import { register } from "../function/post"

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: { value: "", error: "" },
            info: {
                username: { value: "", error: "" },
                password: { value: "", error: "" },
                confirmation: { value: "", error: "" },
                firstname: { value: "", error: "" },
                lastname: { value: "", error: "" },
                email: { value: "", error: "" },
                orientation: { value: "bisexual", error: "" },
                gender: { value: "", error: "" },
                age: { value: 18, error: "" },
                bio: { value: "", error: "" },
                desired: { value: { min: 18, max: 25 }, error: "" },
                distance: { value: 25, error: "" },
            },
            page: 1,
            error: ""
        }
        this.onChange = this.onChange.bind(this)
        this.changePage = this.changePage.bind(this)
        this.register = this.register.bind(this)
    }

    static contextType = UserProvider;

    componentWillReceiveProps(history, props) {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")
    }

    componentDidMount() {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")
    }

    onChange = (index) => {

        let { state, state: { info } } = this
        let key = !(index.target) ? Object.keys(index) : (index.target.placeholder).toLowerCase();
        let value = !(index.target) ? Object.values(index)[0] : index.target.value;
        this.setState({
            ...state,
            info: {
                ...info,
                [key]: {
                    ...info[key],
                    value: value
                }
            }
        })
    }

    changePage = (page) => {
        this.setState({ ...this.state, page })
    }

    register = () => {

        let { info } = this.state
        let data = new FormData();

        data.append("avatar", this.state.data);
        if (!(this.state.data))
            this.setState({ ...this.state, image: { value: "", error: "Please choose your profile picture" } })

        for (let index in info)
            data.append(index, info[index].value);

        let rsl = check(this.state);
        if (typeof rsl === 'object') { this.setState(rsl) }
        else {
            register(data, this.state.info).then(({ res, err }) => {
                this.setState({
                    ...this.state,
                    info: { ...res },
                    error: err
                })
            })
        }
    }

    sendFile = (e) => {
        let reader = new FileReader();

        reader.onloadend = (e) => {
            this.setState({ ...this.state, image: { value: reader.result, error: "" } })
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            this.setState({ ...this.state, data: e.target.files[0] }, () => { })
        }
    };


    render() {
        let { info, image, page, error } = this.state
        let signPage;

        if (page === 1)
            signPage = <FirstPage info={info} onChange={this.onChange} changePage={this.changePage} />
        else if (page === 2)
            signPage = <SecondPage info={info} onChange={this.onChange} changePage={this.changePage} />
        else
            signPage = <ThirdPage register={this.register} info={info} onChange={this.onChange} changePage={this.changePage} error={error} />

        return (
            <div id="signup" className="center" style={{ overflow: "scroll" }} >
                <div style={{ display: "flex", flexDirection: "column", height: "initial", margin: "20px" }}>
                    <ProfileImg image={image} sendFile={this.sendFile} />
                    {signPage}
                </div>
            </div>
        );
    }
}

export default (Signup);