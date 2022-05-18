import { createStyles } from "@mantine/core";
import React from "react";
import logo from "../../sounglah-logo.svg";

const useStyles = createStyles((theme, _params, getRef) => ({
	header: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[5]
				: theme.colors.brown[0],
		color: theme.colors.gray[7],
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "1rem 2rem",
		minHeight: "3rem",

		// Dynamic media queries, define breakpoints in theme, use anywhere
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			// Type safe child reference in nested selectors via ref
			[`& .${getRef("child")}`]: {
				fontSize: theme.fontSizes.xs,
			},
		},

		a: {
			fontWeight: "bolder",
			fontStyle: "italic",
			fontSize: "1.5rem",
			textDecoration: "none",
			color: "inherit",
			display: "flex",
			alignItems: "center",

			"&:hover": {
				color: "#000",
			},
		},
	},
}));

export const Header = () => {
	const { classes } = useStyles();

	return (
		<header className={classes.header}>
			<a href="/">
				<img src={logo} alt="sounglah" />
				SoungLah
			</a>
		</header>
	);
};
