import React from 'react';
import { Button } from 'react-bootstrap';

export default class CategoryView extends React.Component {


	render() {
		let categories = this.props.getCategories();

		return (
			<div>
				<h2>List of Categories</h2>
				temp populated with dummy categories
				<div className="dynamic-grid">
						{categories ? categories[1].subcategories.map((cat, index) => {
							return (
								<Button className="grid-item" key={index} onClick={this.handleClick}>
									{cat.name}
								</Button>
							)
						}) : ""}
				</div>
			</div>
		)
	}
}