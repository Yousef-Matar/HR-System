import store from '@/store/index'

var FileManager = {
	getAllFiles() {
		return store.state.uploadedFiles
	},
	getUserUploadedFiles(userID) {
		return this.getAllFiles().filter((file) => file.userID == userID)
	},
	deleteFile(fileID) {
		store.commit('deleteUploadedFile', fileID)
	},
	encodeFile(fileList, userID) {
		fileList.forEach((file) => {
			let reader = new FileReader()
			reader.onload = () => {
				let fileTemplate = {}
				fileTemplate.ID = this.getAllFiles().length == 0 ? 1 : this.getAllFiles()[this.getAllFiles().length - 1].ID + 1
				fileTemplate.userID = userID
				fileTemplate.fileName = file.name
				fileTemplate.fileType = file.type
				fileTemplate.fileURL = reader.result
				store.commit('setUploadedFiles', this.getAllFiles().concat([fileTemplate]))
			}
			reader.readAsDataURL(file)
		})
	},
	decodeFile(fileURL, fileName, fileType) {
		return fetch(fileURL)
			.then(function (res) {
				return res.arrayBuffer()
			})
			.then(function (buf) {
				return new File([buf], fileName, { type: fileType })
			})
	},
	convertFiletoArray(fileList) {
		var fileArray = Array.from(fileList)
		return fileArray
	},
}
export default FileManager
