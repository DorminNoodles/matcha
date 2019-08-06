import React from 'react';
import { check } from "../function/signup.js"
import { ProfileImg, FirstPage, SecondPage, ThirdPage } from "../component/Signup.js"
import UserProvider from '../context/UserProvider';
import { register } from "../function/post"
import { getUser } from '../function/get'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: { value: "", error: "" },
            // info: {
            //     username: { value: "Dormin", error: "" },
            //     password: { value: "Root123", error: "" },
            //     confirmation: { value: "Root123", error: "" },
            //     firstname: { value: "Loic", error: "" },
            //     lastname: { value: "Chety", error: "" },
            //     email: { value: "03b237b339@himail.online", error: "" },
            //     orientation: { value: "bisexual", error: "" },
            //     gender: { value: "male", error: "" },
            //     age: { value: 18, error: "" },
            //     bio: { value: "je suis s", error: "" },
            //     desired: { value: { min: 18, max: 25 }, error: "" },
            //     distance: { value: 25, error: "" },
            // },
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
            status: { value: "signup", text: "Create your account", function: this.register },
            error: ""
        }
        this.onChange = this.onChange.bind(this)
        this.changePage = this.changePage.bind(this)
        this.register = this.register.bind(this)
        this.modify = this.modify.bind(this)
        this.initInfo = this.initInfo.bind(this)
    }

    static contextType = UserProvider;


    // get the page's type
    // if param init info

    componentWillReceiveProps(next) {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")

        if (next.location.pathname === "/parameters")
            this.setState({ ...this.state, status: { value: "parameters", text: "Modify Your Informations", function: this.modify } },
                () => {
                    getUser(this.context.user.token)
                        .then((res) => { this.initInfo(res.data) })
                })
        else
            this.setState({ ...this.state, status: { value: "signup", text: "Create your account", function: this.register } })

    }

    componentDidMount() {

        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")
    }

    initInfo(nw) {
        let info = Object.assign({ ...this.state.info })

        for (var i in nw)
            info[i] = { value: nw[i], error: "" }

        this.setState({ ...this.state, info }, () => { console.log(this.state) })
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

    changePage = (page) => { this.setState({ ...this.state, page }) }

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

                if (err !== "") {
                    this.setState({
                        ...this.state,
                        info: { ...res },
                        error: err
                    })
                }
                else
                    this.props.history.push("/")

            })
        }
    }

    modify = () => {
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
        let { info, image, page, error, status } = this.state
        let signPage;

        if (page === 1)
            signPage = <FirstPage info={info} onChange={this.onChange} changePage={this.changePage} />
        else if (page === 2)
            signPage = <SecondPage info={info} onChange={this.onChange} changePage={this.changePage} />
        else
            signPage = <ThirdPage status={status} info={info} onChange={this.onChange} changePage={this.changePage} error={error} />

        return (
            <div id="signup" className="center" style={{ overflow: "scroll" }} >
                <div style={{ display: "flex", flexDirection: "column", height: "initial", margin: "20px" }}>
                    <ProfileImg image={image} sendFile={this.sendFile} avatar={info.avatar} />
                    {signPage}
                </div>
            </div>
        );
    }
}

export default (Signup);