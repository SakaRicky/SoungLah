// import { NewStudent, Student } from "types";
import axios from "axios";

const baseURL = "https://sleepy-depths-05281.herokuapp.com/api/";

export interface TranslateProps {
	srcLanguage: string;
	text: string;
}

export interface Translated {
	srcLanguage: string;
	targetLanguage: string;
	srcText: string;
	translatedText: string;
}

export interface Activated {
	translatedText: string;
}

export const translate = async ({ srcLanguage, text }: TranslateProps) => {
	try {
		const response = await axios.post(`${baseURL}translate`, {
			srcLanguage: srcLanguage,
			targetLanguage: "med",
			text: text,
		});

		return response.data;
	} catch (error: any) {
		console.log(error);

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
