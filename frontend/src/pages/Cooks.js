import React, { Component } from 'react';
import Head from "./parts/Head";
import FindCook from "./parts/FindCook";


class Cooks extends Component {
    render() {
        return (

            <div className="cooks-page">
                <Head/>
                <FindCook/>
            </div>
        );
    }
}
export default Cooks;