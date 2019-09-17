import React from 'react';
import { check } from "../function/signup.js"
import { ProfileImg, FirstPage, SecondPage, ThirdPage } from "../component/SignupAndParams.js"
import UserProvider from '../context/UserProvider';
import { register, update } from "../function/post"
import { getUser } from '../function/get'
import { signupInfo } from '../export/object'

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
                ageMin: { value: 18, error: "" },
                ageMax: { value: 25, error: "" },
                distance: { value: 25, error: "" },
                location: { value: "", error: "" },
                latitude: { value: 0, error: "" },
                longitude: { value: 0, error: "" },
            },
            page: 1,
            status: { value: "signup", text: "Create your account", fct: this.register },
            error: "",
            success: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onChangeAge = this.onChangeAge.bind(this)
        this.changePage = this.changePage.bind(this)
        this.register = this.register.bind(this)
        this.initInfo = this.initInfo.bind(this)
        this.onChangeLocation = this.onChangeLocation.bind(this)
    }

    static contextType = UserProvider;


    // get the page's type
    // if param init info

    componentWillReceiveProps(next) {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")
        this.setting(next.location.pathname)
    }

    componentDidMount() {
        if (this.context.header !== "white-red")
            this.context.onChange("header", "white-red")
        this.setting(this.props.location.pathname)
    }

    setting(pathname) {
        if (!(this.context.user.token) && pathname === "/parameters")
            this.props.history.push('/');

        if (pathname === "/parameters")
            this.setState({ ...this.state, ...signupInfo, status: { value: "parameters", text: "Modify Your Informations", fct: this.modify } },
                () => {
                    getUser(this.context.user.token, this.context.user.id)
                        .then((res) => this.initInfo(res.data))
                })
        else
            this.setState({ ...this.state, ...signupInfo, status: { value: "signup", text: "Create your account", fct: this.register } })
    }

    initInfo(nw) {
        let info = Object.assign({ ...this.state.info })

        for (var i in nw)
            info[i] = { value: nw[i], error: "" }

        this.setState({ ...this.state, info })
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

    onChangeLocation = (location) => {

        let { state, state: { info } } = this

        this.setState({
            ...state,
            info: { ...info, ...location }
        })
    }

    onChangeAge = (min, max) => {

        this.setState({
            ...this.state,
            info: {
                ...this.state.info,
                ageMin: { value: min, error: "" },
                ageMax: { value: max, error: "" }
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

        if (rsl.status === 0) { this.setState({ ...this.state, info: { ...rsl.obj } }) }
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

        let { info } = this.state
        let data = new FormData();

        const allowed = ["username", "firstname", "lastname", "email", "gender",
            "orientation", "bio", "age", "distance", "ageMin", "ageMax",
            "location", "latitude", "longitude"]

        const filtered = Object.keys(info)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                if (info[key].value && info[key].value !== "")
                    obj[key] = info[key].value;
                return obj;
            }, {});

        for (let index in filtered)
            data.append(index, filtered[index]);

        update(filtered, this.state.info, this.context.user.token).then(({ res, err }) => {
            if (err && err !== "") {
                this.setState({
                    ...this.state,
                    info: { ...res },
                    error: err
                })
            }
            else {
                this.setState({
                    ...this.state,
                    success: "Update succeed"
                })
            }
        })
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
        let { info, image, page, error, status, success } = this.state
        let signPage;

        if (page === 1)
            signPage = <FirstPage status={status} info={info} onChange={this.onChange} changePage={this.changePage} />
        else if (page === 2)
            signPage = <SecondPage info={info} onChange={this.onChange} changePage={this.changePage} onChangeAge={this.onChangeAge} />
        else
            signPage = <ThirdPage status={status} info={info} onChange={this.onChange} onChangeLocation={this.onChangeLocation} changePage={this.changePage} error={error} success={success} />

        return (
            <div id="signup" className="center" style={{ overflow: "scroll" }} >
                <div style={{ display: "flex", flexDirection: "column", height: "initial", margin: "20px" }}>
                    <ProfileImg image={image} sendFile={this.sendFile} avatar={info.avatar} info={info} />
                    {signPage}
                </div>
            </div>
        );
    }
}

export default (Signup);