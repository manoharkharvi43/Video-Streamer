import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	StatusBar,
	Pressable,
	TouchableHighlight
} from "react-native";
import Constants from "expo-constants";
import VIDEODATA from "./VideoData";
import { FontAwesome } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

//VideoLists

const Videolist = ({title , videoUrl}) => {
	
	const videoSelected = () => {
		videoUrl();
	};
	return (
		<TouchableHighlight onPress={videoSelected} activeOpacity={0.2}>
			<View style={styles.videolist}>
				<FontAwesome name="file-video-o" size={32} color="black"  />
				<View style={{marginLeft:30}}>
					<Text style={{ fontSize: 20 }}>{title}</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
};
export default function VideoScreen({navigation}) {

	const videoClicked =(urls) =>{
		navigation.navigate('videoPlayer',{
			url:urls,
	})
	}
	return (
		<View style={styles.containers}>
			<StatusBar backgroundColor="dodgerblue" />

			<View >
			{VIDEODATA && VIDEODATA.map((data) => <>
			  <Videolist title={data.name}  videoUrl={() =>videoClicked(data.videourl)}   />
            			
			</>)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	containers: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		height: height,
		width: width,
		backgroundColor:'#ededed'
	},
	videolist:{
		borderColor:'#c7c5c5',
		borderWidth:1,
		display:'flex',
		justifyContent:'flex-start',
		alignItems:'center',
		width:width,
		height:height/14,
		flexDirection:'row',


	}
});
