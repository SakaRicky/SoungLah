import { createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme, _params, getRef) => ({
	header: {
		// subscribe to color scheme changes right in your styles
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[5]
				: theme.colors.brown[1],
		color: theme.colors.gray[7],
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "1rem 2rem",
		// borderRadius: theme.radius.sm,

		// Dynamic media queries, define breakpoints in theme, use anywhere
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			// Type safe child reference in nested selectors via ref
			[`& .${getRef("child")}`]: {
				fontSize: theme.fontSizes.xs,
			},
		},

		a: {
			fontWeight: "100",
			fontStyle: "italic",
			fontSize: "1.5rem",
			textDecoration: "none",
			color: "inherit",

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
			<a href="#">SoungLah</a>
		</header>
	);
};
