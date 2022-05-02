import { createStyles, Paper, Select, Textarea } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Language } from "../../types";

export interface TextZone {
	type: "input" | "output";
	sourceTextChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	sourceLanguageChange?: (value: string) => void;
	translated?: string;
	noTextError?: boolean;
}

interface StyleProps {
	noTextError: boolean | undefined;
}

const useStyles = createStyles((theme, { noTextError }: StyleProps) => ({
	root: {
		margin: "1rem 0",
		width: "100%",
		flex: 1,
		outline: noTextError
			? `2px solid ${theme.colors.red[5]}`
			: `1px solid ${theme.colors.green[2]}`,

		// Media query with value from theme
		[`@media (min-width: ${theme.breakpoints.sm}px)`]: {
			width: "auto",
		},
	},
	select: {
		// backgroundColor: "#000",
		// color: "red",
		marginBottom: "0.5rem",
	},
	h5: {
		margin: "0",
		color: "red",
	},
}));

export const TextZone = ({
	type,
	sourceTextChange,
	sourceLanguageChange,
	translated,
	noTextError,
}: TextZone) => {
	const { classes } = useStyles({ noTextError });

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
					minRows={10}
					radius="md"
					placeholder={
						noTextError ? "Please enter some text" : "Select source language"
					}
					required
					onChange={sourceTextChange}
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
				<h5 style={{ margin: "0.5rem", fontSize: "1.2rem" }}>Medumba</h5>
			)}

			<Textarea minRows={10} radius="md" required value={translated} />
		</Paper>
	);
};
