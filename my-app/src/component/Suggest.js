import React from 'react';
import { getLocation } from "../function/get"
import UserProvider from '../context/UserProvider';


function Suggestions({ suggestions, cityHover, changeLocalisation }) {
    return (
        <div id="suggestions">
            {
                suggestions && suggestions.length > 0 &&
                suggestions.map((e, i) => {
                    return (
                        <div
                            className={`suggestion ${cityHover === i && "suggestion_hover"}`}
                            key={i}
                            onClick={(e) => changeLocalisation(i)}
                        >
                            {e.place_name}
                        </div>
                    )
                })
            }
        </div>
    )
}

class Suggest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            cityHover: 0,
            city: {},
            error: ""
        };
        this.textInput = React.createRef();
        this.onKeyDown = this.onKeyDown.bind(this)
        this.FetchRequested = this.FetchRequested.bind(this)
    }
    static contextType = UserProvider;

    async FetchRequested(value) {

        if (this.context.user && this.context.user.token && value)
            await getLocation(this.context.user.token, value).then((res) => {
                if (typeof res === "object")
                    this.setState({ suggestions: res });
                else
                    this.setState({ suggestions: [] });
            })
        else
            await this.setState({ suggestions: [] });

    };

    onKeyDown = (keyCode) => {

        let { cityHover, suggestions } = this.state

        if (keyCode === 38 && cityHover > 0) {
            this.setState({ cityHover: cityHover - 1 }, () => {
                this.textInput.value = suggestions[cityHover].place_name
            })
        }
        else if (keyCode === 40 && suggestions.length - 1 > cityHover)
            this.setState({ cityHover: cityHover + 1, value: suggestions[cityHover + 1].place_name }, () => {
                this.textInput.value = suggestions[cityHover].place_name
            })
        else if (keyCode === 13) {
            this.changeLocalisation(cityHover).then(() => {
                this.setState({ city: suggestions[cityHover], cityHover: 0, suggestions: [] }, () => {
                    this.textInput.value = ""
                })
            })
        }
    }

    async changeLocalisation(i) {
        let city = this.state.suggestions[i]
        let { suggestions, cityHover } = this.state

        if (suggestions.length > 0) {
            await this.props.onChangeLocation({
                location: { value: city.text, error: "" },
                latitude: { value: city.center[1], error: "" },
                longitude: { value: city.center[0], error: "" }
            })
            this.setState({ city: suggestions[cityHover], cityHover: 0, suggestions: [] }, () => {
                this.textInput.value = ""
            })
        }
    }

    render() {

        return (
            <div id="suggest">
                <input id="suggest_input"
                    onChange={(e) => { this.FetchRequested(e.target.value) }}
                    placeholder='Enter your city'
                    onKeyDown={(e) => this.onKeyDown(e.keyCode)}
                    ref={(ref) => this.textInput = ref} />
                <Suggestions  {...this.state} changeLocalisation={this.changeLocalisation.bind(this)} />
            </div>
        )
    }
}

export default Suggest;