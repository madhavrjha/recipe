export const getBase64 = (file: File, callback: (result: string | ArrayBuffer | null) => void) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => {
		callback(reader.result)
	}
}
