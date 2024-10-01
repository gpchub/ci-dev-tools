class ConfirmDialog {
	constructor({ type, questionTitle, questionText, trueButtonText, falseButtonText, parent }) {
		this.questionText = questionText || "Are you sure?";
		this.questionTitle = questionTitle || "";
		this.trueButtonText = trueButtonText || 'OK';
		this.falseButtonText = falseButtonText || 'Huỷ';
		this.parent = parent || document.body;
		this.type = type || 'warning';

		this.dialog = undefined;
		this.trueButton = undefined;
		this.falseButton = undefined;

		this._createDialog();
		this._appendDialog();
	}

	confirm() {
		return new Promise((resolve, reject) => {
			const somethingWentWrongUponCreation =
				!this.dialog || !this.trueButton || !this.falseButton;
			if (somethingWentWrongUponCreation) {
				reject('Someting went wrong when creating the modal');
				return;
			}

			this.dialog.showModal();
			this.trueButton.focus();

			this.trueButton.addEventListener("click", () => {
				resolve(true);
				this._destroy();
			});

			this.falseButton.addEventListener("click", () => {
				resolve(false);
				this._destroy();
			});
		});
	}

	_createDialog() {
		this.dialog = document.createElement("dialog");
		this.dialog.classList.add("confirm-dialog", "is-" + this.type);

		const contentBody = document.createElement('div');
		contentBody.classList.add('confirm-dialog-body');
		this.dialog.appendChild(contentBody);

		const icon = document.createElement('div');
		icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path><path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path></svg>';
		icon.classList.add('confirm-dialog-icon');
		contentBody.appendChild(icon);

		const contentWrapper = document.createElement('div');
		contentWrapper.classList.add('confirm-dialog-content');
		contentBody.appendChild(contentWrapper);

		const title = document.createElement("div");
		title.textContent = this.questionTitle;
		title.classList.add("confirm-dialog-title");
		contentWrapper.appendChild(title);

		const question = document.createElement("div");
		question.innerHTML = this.questionText;
		question.classList.add("confirm-dialog-question");
		contentWrapper.appendChild(question);

		const buttonGroup = document.createElement("div");
		buttonGroup.classList.add("confirm-dialog-footer");
		this.dialog.appendChild(buttonGroup);

		this.trueButton = document.createElement("button");
		this.trueButton.classList.add(
			"button",
			"confirm-dialog-button",
			"confirm-dialog-button--true"
		);
		this.trueButton.type = "button";
		this.trueButton.textContent = this.trueButtonText;
		buttonGroup.appendChild(this.trueButton);

		this.falseButton = document.createElement("button");
		this.falseButton.classList.add(
			"button",
			'is-plain',
			"confirm-dialog-button",
			"confirm-dialog-button--false"
		);
		this.falseButton.type = "button";
		this.falseButton.textContent = this.falseButtonText;
		buttonGroup.appendChild(this.falseButton);

	}

	_appendDialog() {
		this.parent.appendChild(this.dialog);
	}

	_destroy() {
		this.parent.removeChild(this.dialog);
		delete this;
	}
}