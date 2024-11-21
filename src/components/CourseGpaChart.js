import React, { Component } from "react";
import { connect } from "react-redux";
import utils from "../utils";
import PropTypes from "prop-types";
import { GpaChart } from "../containers/charts/GpaChart";

class CourseGpaChart extends Component {
	static propTypes = {
		uuid: PropTypes.string.isRequired,
		instructorId: PropTypes.number,
	};

	componentWillMount = () => {
		this.props.actions.fetchCourseGrades(this.props.uuid);
	};

	componentDidUpdate = this.componentDidMount;

	render = () => {
		const { instructorId, data } = this.props;

		if (!data || data.isFetching) return <GpaChart gradeDistributions={[]} />;

		const cumulativeDistribution = data.courseOfferings
			.map((o) => {
				return {
					...o.cumulative,
					termCode: o.termCode,
				};
			})
			.sort((a, b) => a.termCode - b.termCode);

		let professorDistribution = null;

		if (instructorId) {
			let instructor = data.instructors.filter((i) => i.id === instructorId)[0];
			professorDistribution = {};
			instructor.terms.map((t) => {
				professorDistribution[t.termCode] = utils.grades.gpa(t);
			});
			professorDistribution.name = instructor.name;
		}

		return <GpaChart cumulativeDistributions={cumulativeDistribution} professorDistributions={professorDistribution} />;
	};
}

function mapStateToProps(state, ownProps) {
	const data = state.grades.courses.data[ownProps.uuid];

	return {
		data,
	};
}

export default connect(mapStateToProps, utils.mapDispatchToProps)(CourseGpaChart);
