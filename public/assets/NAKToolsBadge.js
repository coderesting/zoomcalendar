class NAKToolsBadge extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = `
			<a href="https://nak.coderesting.dev">
				<span>This page is part of</span>
            	<img src="/assets/NAKToolsIcon-192x192.png"></img>
			<a>

			<style>

				a{
					position: fixed;
					z-index: 50;
					top: 0px;
					right: 0px;
					display: flex;
					margin: 10px;
					overflow: hidden;
					pointer-events: none;
					border-radius: 7px;
					text-decoration: none;
				}

				a:hover > span{
					transform: translateX(0);
					pointer-events: auto;
				}

				span{
					font-size: 20px;
					color: ${this.getAttribute('text-color')};
					background-color: ${this.getAttribute('background-color')};;
					border-top-left-radius: 10px;
					border-bottom-left-radius: 10px;
					border: solid #1565c0 2px;
					border-right: none;
					display: flex;
					align-items: center;
					transform: translateX(100%);
					transition: 0.3s ease;
					padding: 0px 15px 0 10px;
					margin-right: -5px;
				}

				img{
					width: 50px;
					height: 50px;
					z-index: 10;
					pointer-events: auto;
				}
			</style>
		`;
	}
}

customElements.define('app-naktoolsbadge', NAKToolsBadge);
