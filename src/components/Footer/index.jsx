import React from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(theme => ({
	footer: {
		background: theme.colors.brown[5],
		color: "white",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "1.5rem",
		minHeight: "3rem",
		marginTop: "auto",

		// Media query with value from theme
		// [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
		// 	width: "auto",
		// },
	},
}));

export const Footer = () => {
	const { classes } = useStyles();

	return (
		<footer className={classes.footer}>
			<div>Build by Saka Ricky</div>
			<div>All rights reserved &copy;</div>
		</footer>
	);
};
