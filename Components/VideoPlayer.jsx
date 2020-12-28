import React, { useRef, useEffect } from "react";
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
import Constants from 'expo-constants'

export default function VideoPlayer({ id, route }) {
	const width = Dimensions.get("window").width;
	const height = Dimensions.get("window").height;
	const { url } = route.params;
	useEffect(() => {
		LogBox.ignoreAllLogs();
		toLandscape();
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
			style={[styles.videoContainer, { width: height+Constants.statusBarHeight+20, height: width}]}
			key={id}
		>
			<View style={[styles.loaderContainer, { top: width / 5 }]}>
				<ActivityIndicator size={60} color="dodgerblue" />
			</View>
			<View style={{ width: height/1.1, height:width ,alignSelf:'center' }}>
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
						width: height/1.1,
						height: width/1,
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	videoContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "black",
		padding: 0,
		margin:0
	},
	loaderContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		alignSelf:'center'
	},
});
