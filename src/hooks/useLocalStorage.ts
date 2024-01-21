import { AES, enc } from 'crypto-js'

const SECRET = 'df2560b242a02238a6c1da35dd2307a85c8a904bd3131643c5121447d403a3d3'

const useLocalStorage = (key: string) => {
	const setItem = (value: unknown) => {
		const item = AES.encrypt(JSON.stringify(value), SECRET).toString()
		window.localStorage.setItem(key, item)
	}

	const getItem = () => {
		try {
			const item = window.localStorage.getItem(key)
			if (!item) return undefined
			const bytes = AES.decrypt(item, SECRET)
			const decryptedItem = bytes.toString(enc.Utf8)
			return JSON.parse(decryptedItem)
		} catch (err) {
			console.log(err)
		}
	}

	const removeItem = () => {
		window.localStorage.removeItem(key)
	}

	return { setItem, getItem, removeItem }
}

export default useLocalStorage
