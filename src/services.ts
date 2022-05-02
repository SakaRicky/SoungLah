// import { NewStudent, Student } from "types";
// import axios from "axios";

// const baseURL = "http://127.0.0.1:5000/";

export interface TranslateProps {
	srcLanguage: string;
	text: string;
}

export interface Translated {
	srcLanguage: string;
	targetLanguage: string;
	translatedText: string;
}

// interface TranslateResponse {
// 	translate: Translated;
// }

async function query(data: { inputs: string }) {
	console.log("Fetching from query");
	try {
		const response = await fetch(
			"https://api-inference.huggingface.co/models/rickySaka/en-md",
			{
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_HF_API_KEY}`,
				},
				method: "POST",
				body: JSON.stringify(data),
			}
		);
		const result = await response.json();
		console.log(result);

		return result;
	} catch (error) {
		console.log(error);
		return error;
	}
}

export const translate = async ({ srcLanguage, text }: TranslateProps) => {
	try {
		const res = await query({ inputs: text });

		return {
			srcLanguage: srcLanguage,
			targetLanguage: "med",
			translatedText: res[0].generated_text,
		};

		// const { data } = await axios.post<TranslateResponse>(
		// 	`${baseURL}translate`,
		// 	{
		// 		srcLanguage: srcLanguage,
		// 		targetLanguage: "med",
		// 		text: text,
		// 	}
		// );

		// return data.translate;
	} catch (error: any) {
		console.log(error.message);
	}
};

export const activateModel = async () => {
	try {
		const res = await query({ inputs: "sample" });

		return res;
	} catch (error: any) {
		console.log(error.message);
	}
};
