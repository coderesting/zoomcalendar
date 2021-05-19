import validate from './validate';
import parseTime from '../weekManipulation/parseTime';
import { joinMeeting } from './subjectActions';

export class SubjectScheduler {
	constructor() {
		this.week = {};
		this.subjectTimeouts = [];
		this.closeTab = false;
	}

	setWeek(week, closeTab, closeTabAfter) {
		this.week = week;
		this.closeTab = closeTab;
		this.closeTabAfter = closeTabAfter;
		this.updateTimeouts();
	}

	updateTimeouts() {
		console.log('updating Timeouts');
		this.clearTimeouts();
		const dayIndex = (new Date().getDay() + 1 + 5) % 6; // 0=monday; 4=friday
		if (dayIndex > 4) return;
		const subjectsOfTheDay = this.week[dayIndex].subjects;
		for (const subject of subjectsOfTheDay) {
			if (validate.subjectTime(subject.startTime) && subject.link) {
				this.scheduleSubject(subject);
			}
		}
	}

	scheduleSubject(subject) {
		const { hours, minutes } = parseTime(subject.startTime);
		const currentTime = new Date('May 20, 2021 09:14:00');
		const subjectTime = new Date(currentTime);
		subjectTime.setHours(hours);
		subjectTime.setMinutes(minutes);
		const timeUntilMeeting = subjectTime - currentTime; // in milliseconds
		if (timeUntilMeeting < 0) return; // meeting is in past
		this.subjectTimeouts.push(
			setTimeout(() => {
				joinMeeting(
					subject.link,
					subject.pass,
					this.closeTab,
					this.closeTabAfter
				);
			}, timeUntilMeeting)
		);
		console.log('set timeout for ' + timeUntilMeeting / 1000 / 60 + 'min');
	}

	clearTimeouts() {
		for (const timeout of this.subjectTimeouts) {
			clearTimeout(timeout);
		}
		this.subjectTimeouts = [];
	}
}
