const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];

class User {
	constructor(props) {
		this.name = props?.name || "";
		this.age = props?.age || "";
		this.img = props?.img || "";
		this.role = props?.role || "";
		this.courses = props?.courses || [];
	}

	render() {
		return `
			<div class="user__info">
				<div class="user__info--data">
					<img src="images/users/${this.img}.png" alt="${this.name}" height="50">
					  	<div class="user__naming">
						  		<p>Name: 
						  			<b>
										${this.name}
									</b>
								</p>
						  		<p>Age: 
									<b>
										${this.age}
									</b>
								</p>
					  	</div>
				</div>
				<div class="user__info--role student">
					<img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
					  	<p>
							${this.role}
						</p>
				</div>
			</div>
		`;
	}

	renderCourses() {
		return this.courses.length > 0 ? this.courses.map(({ title, mark }) => `
			<p class="user__courses--course ${this.role}">
				${title}
				<span class="${this.renderMark(mark)}">
					${this.renderMark(mark)}
				</span>
			</p>
		`).join("") : "";
	}

	renderMark(mark) {
		return Object.entries(gradation).reduce((acc, [key, value], index, arr) => {
			if (mark <= key && !acc) {
				acc += value;
			}
			return acc;
		}, "");
	}
}

class Student extends User {
	constructor(props) {
		super(props);
	}
}

class Lector extends User {
	constructor(props) {
		super(props);
	}
	renderCourses() {
		return this.courses.length > 0 ? this.courses.map(({ title, score, studentsScore }) => `
			<div class="user__courses admin--info">
				<div class="user__courses--course lector">
					<p>Title: 
						<b>
							${title}
						</b>
					</p>
					<p>Lector's score: 
					  	<span class="${this.renderMark(score)}">
							${this.renderMark(score)}
						</span>
					</p>
					<p>Average student's score: 
						<span class="${this.renderMark(studentsScore)}">
							${this.renderMark(studentsScore)}
						</span>
					</p>
				</div>
			</div>
	  	`).join("") : "";
	}
}

class Admin extends User {
	constructor(props) {
		super(props);
	}
	renderCourses() {
		return this.courses.length > 0 ? this.courses.map(({ title, score, lector }) => `
		<div class="user__courses admin--info">
                <div class="user__courses--course admin">
                    <p>Title: 
						<b>
							${title}
						</b>
					</p>
                    <p>Admin's score: 
						<span class="${this.renderMark(score)}">
							${this.renderMark(score)}
						</span>
					</p>
                    <p>Lector: 
						<b>
							${lector}
						</b>
					</p>
                </div>
            </div>
	  `).join("") : "";
	}
}

class FactoryUser {
	constructor(user) {
		this.user = user;
	}

	getUserEntity() {
		switch (this.user?.role) {
			case "admin":
				return new Admin(this.user);
			case "lector":
				return new Lector(this.user);
			default:
				return new Student(this.user);
		}
	}
}

const render = users.map(user => {
	const updateUser = new FactoryUser(user).getUserEntity();
	return `
	  	<div class="user">
			${updateUser.render()}
			<div class="user__courses">
		  		${updateUser.renderCourses()}
	  		</div>
	  	</div>
	`;
}).join("");

document.write(`
	<div class="users">
	  	${render}
	</div>
`);