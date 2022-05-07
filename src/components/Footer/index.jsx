import React from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(theme => ({
	footer: {
		background: theme.colors.brown[5],
		color: "white",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		height: "5vh",
		padding: "1rem",

		// Media query with value from theme
		[`@media (min-width: ${theme.breakpoints.sm}px)`]: {
			width: "auto",
		},
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
