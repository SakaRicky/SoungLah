import React, { ChangeEvent, useState, useEffect } from "react";
import "./App.scss";
import { Button, createStyles, MediaQuery } from "@mantine/core";
import { Footer, Header, TextZone } from "./components";
import { activateModel, translate, Translated } from "./services";
import { DownArrow, RightArrow } from "./components/Arrows";
import { TranslatingLoader } from "./components";

const useStyles = createStyles(theme => ({
	app: {
		color: theme.colors.gray[8],
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
		height: "90%",
		backgroundColor: theme.colors.gray[1],

		// Media query with value from theme
		[`@media (min-width: ${theme.breakpoints.sm}px)`]: {
			height: "80vh",
		},

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
		backgroundColor: theme.colors.brown[2],
		color: theme.colors.gray[8],

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
	const [changingsourceText, setChangingSourceText] = useState<boolean>(false);
	const [translatedText, setTranslatedText] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [isTranslating, setIsTranslating] = useState(false);
	const [noTextError, setNoTextError] = useState(false);
	const [nosourceLanguagetError, setNosourceLanguagetErrorError] =
		useState(false);

	const requestActivateModel = async () => {
		try {
			// try to activate by fetching a translation. If
			const modelRespond = await activateModel();
			if (modelRespond.translatedText) {
				setLoading(false);
			}
		} catch (error: any) {
			console.log("error in App useEffect", error);
			setLoading(true);
		}
	};

	useEffect(() => {
		requestActivateModel();
	}, []);

	const sourceLanguageChange = (value: string) => {
		setSourceLanguage(value);
	};

	const sourceTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setSourceText(event.target.value);
		setChangingSourceText(true);
	};

	const fetchTranslation = async () => {
		try {
			if (sourceText === "") {
				setNoTextError(true);
				setInterval(() => {
					setNoTextError(false);
				}, 5000);
			} else if (sourceLanguage === "") {
				setNosourceLanguagetErrorError(true);
				setInterval(() => {
					setNosourceLanguagetErrorError(false);
				}, 5000);
			} else {
				setIsTranslating(true);
				const translated: Translated | undefined = await translate({
					srcLanguage: sourceLanguage,
					text: sourceText,
				});
				console.log(translated);

				if (translated !== undefined) {
					setTranslatedText(translated.translatedText);
					setChangingSourceText(false);
					setIsTranslating(false);
				}
			}
		} catch (error) {
			console.log("Error in fetchTranslation App", error);
			setLoading(true);
			setSourceLanguage(sourceLanguage);
			setSourceText(sourceText);
			setTimeout(() => {
				setLoading(false);
				fetchTranslation();
			}, 20000);
		}
	};

	const textToDisplayInTranslated = changingsourceText ? "" : translatedText;

	return (
		<div className={classes.app}>
			<Header />
			<div className={classes.body}>
				<h1>SoungLah Translator</h1>
				<p>
					Just give it a source text and choose the language you want it to be
					translated.
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
								noTextError={noTextError}
								nosourceLanguagetError={nosourceLanguagetError}
							/>

							{isTranslating ? (
								<TranslatingLoader />
							) : (
								<div>
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
								</div>
							)}

							<TextZone type="output" translated={textToDisplayInTranslated} />
						</div>
						<Button className={classes.button} onClick={fetchTranslation}>
							Translate
						</Button>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}

export default App;
