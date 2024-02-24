export default interface SignUpRequestDto {
    email: string;
    password: string;
    nickname: string;
    telNumber: string;
    address: string;
    addressDetial: string | null;
    agreedPersonal: boolean;
}
