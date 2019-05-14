import React from 'react';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            fistname: "Lisa",
            lastname: "TRAN",
            username: "Lisouiw",
            email: "tran.lili.lili@gmail.com",
            password: "Coucou123!",
            avatar: "",

         };
    }

    register = () => {
        console.log(this.state)

        fetch('https://localhost:3300/api/user/register/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", 
            body: JSON.stringify(this.state)
        }).then(function (result) {
            console.log('Request reuss', result);
        })
        .catch (function (error) {
            console.log('Request failed', error);
        });
    }

    readURL = (input) => {
        console.log(input.target.files[0].we)
        this.setState({ ...this.state,  avatar: input.target.files[0] })
        // if (input.files && input.files[0]) {
        //     var reader = new FileReader();

        //     reader.onload = function (e) {
        //         $('#blah')
        //             .attr('src', e.target.result);
        //     };

        //     reader.readAsDataURL(input.files[0]);
        // }
    }

    onclick = () => {
    }

    render() {
        return (
            <div id="signup" className="center">

                <div style={{ maxWidth: "200px", display: "flex", flexDirection: "column" }}>
                    <p>Matcha</p>
                    <div className="center" style={{ flexWrap: "wrap" }}>
                        <figure className="image is-128x128">
                            <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" alt="profil" />
                        </figure>
                        <div className="file is-boxed" style={{ width: "200px" }}>
                            <label className="file-label">
                                <input className="file-input" type="file" name="resume"  onChange={(e) => {this.readURL(e)}} />
                                <span className="file-cta">
                                    <span className="file-icon">
                                        <i className="fas fa-upload"></i>
                                    </span>
                                    <span className="file-label">
                                        Choose your image profil
                                         </span>
                                </span>
                            </label>
                        </div>
                    </div>


                    <div className="field">
                        <input className="input" type="text" placeholder="Fistname" />
                    </div>


                    <div className="field">
                        <input className="input" type="text" placeholder="Lastname" />
                    </div>

                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="Username" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </p>
                    </div>


                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" placeholder="Email" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>


                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="Password" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>

                    <button className="button" onClick={this.register}>Create an account</button>
                </div>

            </div>
        );
    }
}

export { Signup };   