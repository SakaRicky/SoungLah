import { createStyles, Paper, Select, Textarea } from "@mantine/core";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import { Language } from "../../types";

export interface TextZone {
	type: "input" | "output";
	sourceTextChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	sourceLanguageChange?: (value: string) => void;
	translated?: string;
}

const useStyles = createStyles(theme => ({
	root: {
		marginTop: "1rem",
	},
	select: {
		// backgroundColor: "#000",
		// color: "red",
		marginBottom: "0.5rem",
	},
}));

export const TextZone = ({
	type,
	sourceTextChange,
	sourceLanguageChange,
	translated,
}: TextZone) => {
	const { classes } = useStyles();

	const inputLanguages: Language[] = [
		{ value: "fre", label: "French" },
		{ value: "eng", label: "English" },
	];

	const outPutLanguages: Language[] = [
		{ value: "med", label: "Medumba" },
		{ value: "dul", label: "Douala" },
	];

	// used to decide if user can select target language
	// will be useful when we can translate to more than 1 languages like Douala
	const manyTargetLanguages = false;

	if (type === "input") {
		return (
			<Paper shadow="xs" radius="md" p="md" className={classes.root}>
				<Select
					className={classes.select}
					placeholder="Select source language"
					data={inputLanguages}
					radius="sm"
					onChange={sourceLanguageChange}
				/>

				<Textarea
					minRows={6}
					radius="md"
					placeholder="Enter your text here"
					required
					onChange={sourceTextChange}
					// className={classes.}
				/>
			</Paper>
		);
	}

	return (
		<Paper shadow="xs" radius="md" p="md" className={classes.root}>
			{manyTargetLanguages ? (
				<Select
					className={classes.select}
					placeholder="Select target language"
					data={outPutLanguages}
					radius="sm"
				/>
			) : (
				<h5>Medumba</h5>
			)}

			<Textarea
				minRows={6}
				radius="md"
				required
				value={translated}
				// className={classes.}
			/>
		</Paper>
	);
};
