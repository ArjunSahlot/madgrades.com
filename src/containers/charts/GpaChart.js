import React, { Component } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PropTypes from "prop-types";
import utils from "../../utils";

export class GpaChart extends Component {
	static propTypes = {
		cumulativeDistributions: PropTypes.arrayOf(PropTypes.object).isRequired,
		professorDistributions: PropTypes.object,
		title: PropTypes.string,
	};

	render = () => {
		const { title, cumulativeDistributions, professorDistributions } = this.props;

		if (!cumulativeDistributions) return null;

		const data = cumulativeDistributions.map((cumulativeDistribution) => {
			return {
				cumulativeGpa: utils.grades.gpa(cumulativeDistribution),
				professorGpa: professorDistributions ? professorDistributions[cumulativeDistribution.termCode] : null,
				termName: utils.termCodes.toName(cumulativeDistribution.termCode),
			};
		});

		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div>
					<p style={{ textAlign: "center" }}>{title}</p>
				</div>
				<div style={{ flex: 1 }}>
					<ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
						<LineChart data={data} margin={{ top: 20, right: 20, left: -15, bottom: 80 }}>
							<CartesianGrid stroke="#ccc" />
							<XAxis dataKey="termName" interval={0} angle={-45} textAnchor="end" type="category" />
							<YAxis domain={[(min) => Math.floor(Math.min(3.0, min)), (max) => 4.0]}>
								<Label value="Average GPA" position="insideLeft" dx={15} dy={25} angle={-90} />
							</YAxis>
							<Line type="monotone" name="Average GPA" dataKey="cumulativeGpa" isAnimationActive={false} />
							{professorDistributions && (
								<Line
									type="monotone"
									name={`${professorDistributions.name || "Professor"} GPA`}
									dataKey="professorGpa"
									isAnimationActive={false}
									stroke="red"
								/>
							)}
							<Tooltip formatter={(gpa) => utils.grades.formatGpa(gpa)} />
							{professorDistributions && <Legend verticalAlign="top" height={36} />}
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		);
	};
}
