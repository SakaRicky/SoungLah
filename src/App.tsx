import React, { ChangeEvent, useState, useEffect } from "react";
import "./App.scss";
import { Button, createStyles, MediaQuery } from "@mantine/core";
import { Header, TextZone } from "./components";
import { activateModel, translate, Translated } from "./services";
import { DownArrow, RightArrow } from "./components/Arrows";

const useStyles = createStyles(theme => ({
	app: {
		color: theme.colors.gray[8],
		backgroundColor: theme.colors.gray[1],
		height: "100vh",
		// maxWidth: "1200px",

		h1: {
			textAlign: "center",
			margin: "1.2rem 0",
		},
		p: {
			textAlign: "center",
			lineHeight: 1.4,
			margin: "0.5rem",
		},
	},

	body: {
		padding: "1rem",

		h1: {},
	},

	translationArea: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",

		// Media query with value from theme
		[`@media (min-width: ${theme.breakpoints.sm}px)`]: {
			width: "100%",
			flexDirection: "row",
			justifyContent: "center",
			gap: "0.5rem",
		},
	},
	button: {
		display: "block",
		borderRadius: "1rem",
		width: "50%",
		maxWidth: "500px",
		margin: "1rem auto",
		backgroundColor: theme.colors.brown[5],

		"&:hover": {
			backgroundColor: theme.colors.brown[3],
		},
	},
	arrow: {
		background: "white",
		borderRadius: "50%",
		padding: "0.25rem",
		backgroundColor: theme.colors.green[1],
	},
}));

function App() {
	const { classes } = useStyles();
	const [sourceLanguage, setSourceLanguage] = useState<string>("");
	const [sourceText, setSourceText] = useState<string>("");
	const [translatedText, setTranslatedText] = useState<string>("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			const modelRespond = activateModel();
			console.log(modelRespond);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}, []);

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
				{loading ? (
					<div className="container">
						<div className="circleloader"></div>
					</div>
				) : (
					<div>
						<div className={classes.translationArea}>
							<TextZone
								type="input"
								sourceLanguageChange={sourceLanguageChange}
								sourceTextChange={sourceTextChange}
							/>

							<MediaQuery largerThan="sm" styles={{ display: "none" }}>
								<div className={classes.arrow}>
									<DownArrow />
								</div>
							</MediaQuery>

							<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
								<div className={classes.arrow}>
									<RightArrow />
								</div>
							</MediaQuery>

							<TextZone type="output" translated={translatedText} />
						</div>
						<Button className={classes.button} onClick={fetchTranslation}>
							Translate
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
