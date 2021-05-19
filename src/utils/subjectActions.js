import Vue from 'vue';

export async function copyPassToClipboard(pass) {
	if (!navigator.clipboard) {
		Vue.notify({
			group: 'main',
			title: 'Failed to copy the password',
			text: `Here is your pasword: ${pass}`,
			duration: 10000,
			type: 'error',
		});
		throw new Error('Copy to clipboard failed');
	}
	await navigator.clipboard.writeText(pass);
	Vue.notify({
		group: 'main',
		title: 'Password copied to clipboard',
		duration: 2000,
		type: 'success',
	});
}

export async function joinMeeting(link, pass, closeTab, closeTabAfter) {
	console.log('join');
	if (pass) await copyPassToClipboard(pass);
	const win = window.open(link, '_blank');
	if (closeTab) {
		setTimeout(() => {
			win.close();
		}, closeTabAfter * 1000);
	}
}
