import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components";
import { RowView, ColumnView } from "../../constants/styled";
import moment from "moment";
import {
  Title,
  Subheading,
  Paragraph,
  Caption,
  useTheme,
} from "react-native-paper";

const MusicListHeader = ({
  singerName,
  picUrl,
  publicTime,
  company,
  shareCount,
  commentCount
}) => {
  const PaperTheme = useTheme();
  const [isHeart,setIsHeart] = React.useState(false)
  return (
    <>
      <RowView>
        <Image source={{ uri: picUrl }} />
        <ColumnView style={{ flex: 1, padding: 5 }} item="flex-start">
          <Paragraph>
            <Subheading>歌手:</Subheading>
            <Caption>{singerName || ""}</Caption>
          </Paragraph>
          <Paragraph>
            <Subheading>发行时间:</Subheading>
            <Caption>{moment(publicTime).format("YYYY-MM-DD")}</Caption>
          </Paragraph>
          <Paragraph>
            <Subheading>发行公司:</Subheading>
            <Caption>{company}</Caption>
          </Paragraph>
          <Paragraph style={{ height: 30 }}>
            <FontAwesome
              name="share-square-o"
              size={20}
              color={PaperTheme.colors.text}
            />
            <Caption>{shareCount}</Caption>
            <Caption> </Caption>
            <Caption> </Caption>
            <FontAwesome
              name="comment-o"
              size={20}
              color={PaperTheme.colors.text}
            />
            <Caption>{commentCount}</Caption>
          </Paragraph>
          <TouchableWithoutFeedback onPress={() => setIsHeart(isHeart => !isHeart)}>
            <FontAwesome5
              name={isHeart ? "grin-hearts" : "heart"}
              size={20}
              color={isHeart ? "#f00" : PaperTheme.colors.text}
            />
          </TouchableWithoutFeedback>
        </ColumnView>
      </RowView>
    </>
  );
};

const Image = styled.Image`
  width: ${(props) => props.width || "150px"};
  height: ${(props) => props.height || "150px"};
  border-radius: 4px;
`;

export default MusicListHeader;
