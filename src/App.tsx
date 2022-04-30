import React, { ChangeEvent, useState } from "react";
import "./App.scss";
import { Button, createStyles } from "@mantine/core";
import { Header, TextZone } from "./components";
import { translate, Translated } from "./services";

const useStyles = createStyles(theme => ({
	app: {
		color: theme.colors.gray[8],
		backgroundColor: theme.colors.gray[1],
		// height: "100vh",

		h1: {
			textAlign: "center",
		},
		p: {
			textAlign: "center",
			lineHeight: 1.4,
		},
	},

	body: {
		padding: "1rem",
	},
	translationArea: {
		width: "100%",
	},
	button: {
		display: "block",
		borderRadius: "1rem",
		width: "50%",
		margin: "1rem auto",
		backgroundColor: theme.colors.brown[5],

		"&:hover": {
			backgroundColor: theme.colors.brown[3],
		},
	},
}));

function App() {
	const { classes } = useStyles();
	const [sourceLanguage, setSourceLanguage] = useState<string>("");
	const [sourceText, setSourceText] = useState<string>("");
	const [translatedText, setTranslatedText] = useState<string>("");

	const sourceLanguageChange = (value: string) => {
		setSourceLanguage(value);
	};

	const sourceTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setSourceText(event.target.value);
	};

	const fetchTranslation = async () => {
		const translated: Translated | undefined = await translate({
			srcLanguage: sourceLanguage,
			text: sourceText,
		});
		console.log(translated);

		if (translated !== undefined) {
			setTranslatedText(translated.translatedText);
		}
	};

	return (
		<div className={classes.app}>
			<Header />
			<div className={classes.body}>
				<h1>SoungLah Translator</h1>
				<p>
					SoungLah accompany you in translating text from English and french to
					local languages in Cameroon. Just give it a source text and choose the
					language you want it to be translated.
				</p>
				<div className={classes.translationArea}>
					<TextZone
						type="input"
						sourceLanguageChange={sourceLanguageChange}
						sourceTextChange={sourceTextChange}
					/>
					<TextZone type="output" translated={translatedText} />
					<Button className={classes.button} onClick={fetchTranslation}>
						Translate
					</Button>
				</div>
			</div>
		</div>
	);
}

export default App;
