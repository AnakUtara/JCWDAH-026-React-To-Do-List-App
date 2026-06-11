// authenticated akan menjadi boolean pengecekan apakah user ini sudah login atau belum
// Karena pindah page menggunakan browser url input akan menyebabkan state hilang
// Maka dari itu nanti di localStorage akan disimpan informasi apakah user sudah login atau belum,
// sehingga ketika user refresh page atau pindah page, informasi login tetap ada
export interface IUser {
	email: string;
	password: string;
	confirmPassword: string;
}
