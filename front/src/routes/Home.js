import React from "react";
import { getCategories } from "../Backend";
import Sidebar from "../components/Sidebar";


export default class Home extends React.Component {
    componentDidMount = async () => {
        let categories = await getCategories().catch((error) => {
            alert.error(error);
            return null;
        })
        this.setState({
            categories: categories
        })
    }

    getCats = () => this.state ? this.state.categories : null;

    render() {
        return (
            <div style={{height: '100%', display: 'flex'}}>
                <Sidebar getCategories={this.getCats}/>
                <div>
                    Temp Home
                </div>
            </div>
        )
    }
}

