import parseTime from './parseTime';
import validate from '../store/validate';
const Validator = require('jsonschema').Validator;

Validator.prototype.customFormats.link = function (link) {
	return validate.subjectLink(link) || link == '';
};
const validator = new Validator();

const schema = {
	type: 'array',
	items: {
		properties: {
			name: { type: 'string' },
			subjects: {
				type: 'array',
				items: {
					properties: {
						name: { type: 'string' },
						link: { type: 'string', format: 'link' },
						pass: { type: 'string' },
						startTime: { type: 'string' },
						endTime: { type: 'string' },
					},
					required: ['name', 'link', 'pass'],
				},
			},
		},
		required: ['name', 'subjects'],
	},
};

function removeDuplicates(subjects) {
	const subjectUniqueProps = subjects.map(
		(subject) => subject.name + subject.startTime + subject.endTime
	);
	return subjects.filter((subject, subjectIdx) => {
		return (
			subjectIdx ===
			subjectUniqueProps.indexOf(
				subject.name + subject.startTime + subject.endTime
			)
		);
	});
}

function fixTime(time) {
	const parsedTime = parseTime(time);
	if (!parsedTime) return '';
	const hours = parsedTime.hours.toString().padStart(2, '0');
	const minutes = parsedTime.minutes.toString().padStart(2, '0');
	return `${hours}:${minutes}`;
}

function autoFixWeek(week) {
	week.forEach((day) => {
		day.subjects.forEach((subject) => {
			subject.id = Math.random().toString(36).substr(2, 9);
			subject.startTime = fixTime(subject.startTime);
			subject.endTime = fixTime(subject.endTime);
		});

		day.subjects = removeDuplicates(day.subjects);
	});

	return week;
}

export default function (week) {
	const validationRes = validator.validate(week, schema);
	console.log(validationRes);
	if (!validationRes.valid) {
		return null;
	}
	autoFixWeek(week);
	return week;
}
