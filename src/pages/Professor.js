import React from "react";
import CourseName from "../components/course/CourseName";
import { Container, Divider, Header } from "semantic-ui-react";
import CourseChartViewer from "../components/course/CourseChartViewer";
import CourseGpaChart from "../components/course/CourseGpaChart";
import { parse, stringify } from "qs";
import CourseData from "../components/course/CourseData";

const Professor = ({ match, location, history }) => {
	document.title = " - Madgrades";

	const { id } = match.params;
	const params = parse(location.search.substr(1));

	let { courseUuid, termCode } = params;

	courseUuid = courseUuid || "";
	termCode = parseInt(termCode || "0", 10);

	const onChange = (params) => {
		history.push(`/professors/${id}?${stringify(params)}`);
	};

	const onCourseDataLoad = (data) => {
		const { name, subjects, number } = data;

		let visibleName = name || "Unknown Name";
		let title = visibleName + " - Madgrades";

		let desc =
			subjects
				.map((s) => s.abbreviation)
				.slice(0, 3)
				.join(", ") +
			" " +
			number;
		desc += " UW Madison professor grade distribution and average GPA over time or by course.";

		document.title = title;
		document.querySelector('meta[name="description"]').setAttribute("content", desc);
	};

	return (
		// Structure:
		// Professor name/sections they teach
		//
		// <Container className="Professor">
		// 	<CourseData uuid={uuid} onDataLoad={onCourseDataLoad} />
		// 	<Header size="huge">
		// 		<Header.Content style={{ maxWidth: "100%" }}>
		// 			<CourseName uuid={uuid} fallback={"(Unknown Name)"} />
		// 			<Header.Subheader style={{ maxWidth: "100%" }}>
		// 				<CourseName uuid={uuid} asSubjectAndNumber={true} />
		// 			</Header.Subheader>
		// 		</Header.Content>
		// 	</Header>
		// 	<Divider />
		// 	<CourseChartViewer instructorId={instructorId} termCode={termCode} onChange={onChange} uuid={uuid} />
		// 	<Divider />
		// 	<CourseGpaChart uuid={uuid} />
		// </Container>
		<Header as="h1">
			<Header.Content>Professor Id: {id}</Header.Content>
			<Header.Subheader>Sections they teach</Header.Subheader>
		</Header>
	);
};
export default Professor;
