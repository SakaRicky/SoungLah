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

export interface Activated {
	translatedText: string;
}

// interface TranslateResponse {
// 	translate: Translated;
// }

async function query(data: { inputs: string }) {
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

		return response;
	} catch (error: any) {
		throw new Error("translation server error, logging", error);
	}
}

export const translate = async ({ srcLanguage, text }: TranslateProps) => {
	try {
		const response = await query({ inputs: text });
		const result = await response.json();

		return {
			srcLanguage: srcLanguage,
			targetLanguage: "med",
			translatedText: result[0].generated_text,
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
		throw new Error("Error in translate", error);
	}
};

export const activateModel = async (): Promise<Activated> => {
	// if (typeof(res.error) === "string") {
	// 	throw new Error("Server loading model");
	// }

	try {
		// const response = await query({ inputs: "sample" });
		// const result = await response.json();

		return { translatedText: "result[0].generated_text" };

		// return {
		// 	translatedText: result[0].generated_text,
		// };
	} catch (error: any) {
		throw new Error("Error caught by activateModel", error);
	}
};
