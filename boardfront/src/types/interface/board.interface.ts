export default interface Board {
    boardNumber: number;
    title: string;
    content: string;
    boardImageList: string[];
    wrtDttm: string;
    writerEmail: string;
    writerNickname: string;
    writerProfileImage: string | null;
}
