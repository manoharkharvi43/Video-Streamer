import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	ActivityIndicator,
	LogBox,
} from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

export default function VideoPlayer({ id, route }) {
	const width = Dimensions.get("window").width;
	const height = Dimensions.get("window").height;
	const { url } = route.params;
	useEffect(() => {
		LogBox.ignoreAllLogs();
		toLandscape();
		console.log(width, height);
		return () => {
			toPotrait();
		};
	}, []);
	const toLandscape = async () => {
		await ScreenOrientation.lockAsync(
			ScreenOrientation.OrientationLock.LANDSCAPE
		);
	};
	const toPotrait = async () => {
		await ScreenOrientation.lockAsync(
			ScreenOrientation.OrientationLock.PORTRAIT
		);
	};
	const videoRef = useRef(null);

	return (
		<View
			style={[styles.videoContainer, { width: height, height: width }]}
			key={id}
		>
			<View style={[styles.loaderContainer, { top: width / 5 }]}>
				<ActivityIndicator size={60} color="dodgerblue" />
			</View>
			<Video
				source={{ uri: url }}
				rate={1.0}
				volume={1.0}
				isMuted={false}
				resizeMode="cover"
				shouldPlay={false}
				isLooping={false}
				usePoster
				ref={videoRef}
				useNativeControls={true}
				style={{
					width: height,
					height: width,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	videoContainer: {
		margin: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		backgroundColor: "black",
	},
	loaderContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
	},
});
