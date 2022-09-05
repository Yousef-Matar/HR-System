import store from '@/store/index'

var DocumentManager = {
	getAllDocumentRequests() {
		return store.state.documentRequests
	},
   getDocumentRequestByID(requestID) {
		return this.getAllDocumentRequests().find((documentRequest) => documentRequest.ID == requestID)
	},
   cancelDocumentRequest(requestID) {
		store.commit('cancelDocumentRequest', requestID)
	},
   addDocumentRequest(request) {
		store.commit('setDocumentRequests', this.getAllDocumentRequests().concat([request]))
	},
}
export default DocumentManager
