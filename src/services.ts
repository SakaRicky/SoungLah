// import { NewStudent, Student } from "types";
import axios from "axios";

const baseURL = "http://127.0.0.1:5000/";

export interface TranslateProps {
	srcLanguage: string;
	text: string;
}

export interface Translated {
	srcLanguage: string;
	targetLanguage: string;
	translatedText: string;
}

interface TranslateResponse {
	translate: Translated;
}

async function query(data: any) {
	console.log("Fetching from query");
	const response = await fetch(
		"https://api-inference.huggingface.co/models/rickySaka/eng-med",
		{
			headers: {
				Authorization: "Bearer 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",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	console.log(result);

	return result;
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
