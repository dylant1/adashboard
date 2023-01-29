import puppeteer from 'puppeteer';
export interface IAssignment {
		name: string;
		learning_page_data: {
			grade: number | null;
			due_date: string;
		};
		prep_questions_data: {
			grade: number | null;
			due_date: string | null;
		};
		practice_questions_data: {
			grade: number | null;
			due_date: string;
		};
	}


export const scrape = async (ut_netid: string, ut_password: string, classCode: string, year: string, semester: string) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const base_url = 'https://efcms.engr.utk.edu/ef' + classCode + '-' + year + '-' + semester + '/';
	const login_page = 'sys.php?f=login';

	await page.goto(base_url + login_page);

	await page.type('input[name="username"]', ut_netid);
	await page.type('input[name="passwd"]', ut_password);
	await page.click('input[type="submit"]');

	await page.waitForNavigation();
	await page.$x("//a[contains(., 'Learning Pages')]");
	const [el]: any = await page.$x("//a[contains(., 'Learning Pages')]");
	if (el) {
		await el.click();
	}
	await page.waitForNavigation();

	const learning_pages_td = await page.evaluate(() => {
		const tds = Array.from(document.querySelectorAll('td'));
		return tds.map(td => td.innerHTML);
	});
	//find the a tags with target="_blank"
	//create the interface for the assignments
	const efcms_assignments: IAssignment[] = [];

	function getGrade(grade: string | number | null) {
		if (grade == '\n' || grade == '') {
			return null;
		}
		else {
			return Number(grade);
		}
	}
	for (let i = 0; i < learning_pages_td.length; i++) {
		if (learning_pages_td[i].includes('<nobr>')) {
			const a_tag = learning_pages_td[i + 1].match(/<a.*?>(.*?)<\/a>/);

			//TODO: later on could add links to the assignments
			//setup typescript interfaces for the assignments
			const learning_pages_temp = learning_pages_td[i + 2].replace(/<a.*?>/g, '').replace(/<\/a>/g, '');
			const prep_questions_temp = learning_pages_td[i + 3].replace(/<a.*?>/g, '').replace(/<\/a>/g, '');
			const practice_questions_temp = learning_pages_td[i + 4].replace(/<a.*?>/g, '').replace(/<\/a>/g, '');

			const learning_page_grade: number | null = getGrade(learning_pages_temp);
			const prep_questions_grade: number | null = getGrade(prep_questions_temp);
			const practice_questions_grade: number | null = getGrade(practice_questions_temp);

			const learning_page_due_date = learning_pages_td[i].replace(/<nobr>/g, '').replace(/<\/nobr>/g, '').replace(/\n/g, '');
			const practice_questions_due_date = learning_pages_td[i].replace(/<nobr>/g, '').replace(/<\/nobr>/g, '').replace(/\n/g, '');
			let prep_questions_due_date: string | null = null;
			if (learning_pages_td[i + 5] != undefined) {
				prep_questions_due_date = learning_pages_td[i + 5].replace(/<nobr>/g, '').replace(/<\/nobr>/g, '').replace(/\n/g, '');
			}

			if (a_tag != null && a_tag.length >= 1) {
				const assignment_name = a_tag[1].split(': ')[1];
				efcms_assignments.push({ 
					name: assignment_name,
					learning_page_data: {
						grade: learning_page_grade,
						due_date: learning_page_due_date
					},
					prep_questions_data: {
						grade: prep_questions_grade,
						due_date: prep_questions_due_date
					},
					practice_questions_data: {
						grade: practice_questions_grade,
						due_date: practice_questions_due_date
					}
				});
			}
		}
	}

	await browser.close();
	return efcms_assignments;
}
