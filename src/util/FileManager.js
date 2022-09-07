import store from '@/store/index'

import UsersManager from '@/util/UsersManager'

var FileManager = {
	getFileID() {
		if (this.getAllFiles().uploadedFiles.length == 0 && this.getAllFiles().requestedFiles.length == 0) return 1
		if (this.getAllFiles().uploadedFiles.length == 0 && this.getAllFiles().requestedFiles.length != 0) return this.getAllFiles().requestedFiles[this.getAllFiles().requestedFiles.length - 1].ID + 1
		if (this.getAllFiles().uploadedFiles.length != 0 && this.getAllFiles().requestedFiles.length == 0) return this.getAllFiles().uploadedFiles[this.getAllFiles().uploadedFiles.length - 1].ID + 1
		return this.getAllFiles().uploadedFiles.length + this.getAllFiles().requestedFiles.length + 1
	},
	getAllFiles() {
		return store.state.allFiles
	},
	getAllUploadedFiles() {
		return this.getAllFiles().uploadedFiles
	},
	getAllRequestedFiles() {
		return this.getAllFiles().requestedFiles
	},
	getAllOtherUsersRequestedFiles(userID) {
		return this.getAllRequestedFiles().filter((file) => file.userID != userID && UsersManager.getUserByID(file.userID).status != 'disabled')
	},
	getUserUploadedFiles(userID) {
		return this.getAllUploadedFiles().filter((file) => file.userID == userID)
	},
	getUserRequestedFiles(userID) {
		return this.getAllRequestedFiles().filter((file) => file.userID == userID)
	},
	getFileRequestByID(requestID) {
		return this.getAllRequestedFiles().filter((file) => file.ID == requestID)
	},
	deleteFile(fileID, fileType) {
		store.commit('deleteFile', { fileID: fileID, fileType: fileType })
	},
	addFile(file, fileType) {
		store.commit('setAllFiles', { file: file, fileType: fileType })
	},
	encodeFile(fileList, userID, fileType) {
		fileList.forEach((file) => {
			let reader = new FileReader()
			reader.onload = () => {
				let fileTemplate = {}
				fileTemplate.ID = this.getFileID()
				fileTemplate.userID = userID
				fileTemplate.fileName = file.name
				fileTemplate.fileType = file.type
				fileTemplate.fileURL = reader.result
				this.addFile(fileTemplate, fileType)
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
	changeFileRequestStatus(requestID, status) {
		if (status == 'rejected') {
			store.commit('changeFileRequestStatus', { requestID: requestID, status: status, handler: UsersManager.getActiveUser().ID })
		}
	},
}
export default FileManager
