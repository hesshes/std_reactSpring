export default interface BoardListItem {
    boardNubmer: number;
    title: string;
    content: string;
    boardTitleImage: string | null;
    favoriteCount: number;
    commentCount: number;
    viewCount: number;
    wrtDttm: string;
    writerNickname: string;
    writerProfileImage: string | null;
}
